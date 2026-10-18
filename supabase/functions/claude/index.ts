// Estúdio de Pautas BHM: Edge Function que conversa com a API da Anthropic.
// A chave fica guardada como segredo no Supabase (ANTHROPIC_API_KEY) e nunca vai para o navegador.
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    // Só quem está liberado na tabela estudio_acesso pode usar o Claude.
    const auth = req.headers.get("Authorization") ?? "";
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: auth } },
    });
    const { data: membro, error: e1 } = await sb.rpc("estudio_sou_membro");
    if (e1 || !membro) return json({ error: "Acesso não liberado", code: "not_granted" }, 403);

    const { input } = await req.json();
    const messages = typeof input === "string" ? [{ role: "user", content: input }] : input;
    if (!Array.isArray(messages) || !messages.length) return json({ error: "Pedido vazio", code: "invalid_request" }, 400);

    const key = Deno.env.get("ANTHROPIC_API_KEY");
    if (!key) return json({ error: "Segredo ANTHROPIC_API_KEY não configurado", code: "upstream_error" }, 500);

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: Deno.env.get("ANTHROPIC_MODEL") ?? "claude-sonnet-5-5",
        max_tokens: 8000,
        messages,
      }),
    });
    const d = await r.json();
    if (!r.ok) {
      return json({ error: d?.error?.message || "Erro na API da Anthropic", code: r.status === 429 ? "rate_limited" : "upstream_error" },
        r.status === 429 ? 429 : 502);
    }
    const text = (d.content || []).filter((b: any) => b.type === "text").map((b: any) => b.text).join("");
    return json({ text, truncated: d.stop_reason === "max_tokens" });
  } catch (e) {
    return json({ error: String(e), code: "upstream_error" }, 500);
  }
});
