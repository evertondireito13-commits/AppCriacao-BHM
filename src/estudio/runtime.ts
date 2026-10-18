/* eslint-disable @typescript-eslint/no-explicit-any */
// Estúdio de Pautas BHM: camada de conexão com o Supabase (Lovable Cloud).
// O app foi escrito para o runtime do claude.ai (window.claude.use("db"), "user",
// "room", "sample", "downloads", "assets"). Este arquivo recria essas mesmas
// funções em cima do Supabase, para que public/estudio/app.js rode sem mudanças.
import { supabase } from "@/integrations/supabase/client";

const sb: any = supabase;
const TABELA = "estudio_docs";
const BUCKET = "estudio-marca";

/* ---------------- utilidades ---------------- */
const clone = (x: any) => (x == null ? x : JSON.parse(JSON.stringify(x)));
const rid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
const collOf = (path: string) => path.slice(0, path.lastIndexOf("/"));
function deepMerge(a: any, b: any) {
  const out: any = a && typeof a === "object" && !Array.isArray(a) ? { ...a } : {};
  for (const k of Object.keys(b)) {
    const v = b[k];
    out[k] = v && typeof v === "object" && !Array.isArray(v) ? deepMerge(out[k], v) : v;
  }
  return out;
}
function mapErr(e: any) {
  const msg = e?.message || String(e);
  const rls = e?.code === "42501" || /row-level security|permission denied/i.test(msg);
  return { code: rls ? "invalid_argument" : "unavailable", message: msg };
}
const esc = (s: any) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

/* ---------------- banco de documentos (db) ---------------- */
const store = new Map<string, any>();
const listeners = new Set<() => void>();
let notifyTimer: any = null;
function notify() {
  if (notifyTimer) return;
  notifyTimer = setTimeout(() => {
    notifyTimer = null;
    listeners.forEach((f) => {
      try { f(); } catch (e) { console.error(e); }
    });
  }, 0);
}
function docSnap(path: string) {
  const d = store.get(path);
  return {
    id: path.split("/").pop(),
    exists: d !== undefined,
    data: () => (d === undefined ? undefined : clone(d)),
    metadata: { fromCache: false, hasPendingWrites: false },
  };
}
async function persist(path: string, data: any) {
  const { error } = await sb.from(TABELA).upsert({
    path, collection: collOf(path), data, updated_at: new Date().toISOString(),
  });
  if (error) throw mapErr(error);
}
function docRef(path: string): any {
  return {
    id: path.split("/").pop(),
    path,
    async get() { return docSnap(path); },
    async set(data: any) {
      const prev = store.get(path);
      store.set(path, clone(data)); notify();
      try { await persist(path, clone(data)); }
      catch (e) { prev === undefined ? store.delete(path) : store.set(path, prev); notify(); throw e; }
    },
    async update(data: any) {
      const prev = store.get(path);
      if (prev === undefined) throw { code: "invalid_argument", message: "Documento não existe" };
      const next = deepMerge(prev, clone(data));
      store.set(path, next); notify();
      try { await persist(path, next); }
      catch (e) { store.set(path, prev); notify(); throw e; }
    },
    async delete() {
      const prev = store.get(path);
      store.delete(path); notify();
      const { error } = await sb.from(TABELA).delete().eq("path", path);
      if (error) { if (prev !== undefined) store.set(path, prev); notify(); throw mapErr(error); }
    },
    onSnapshot(next: any) {
      let last = "\u0000";
      const f = () => {
        const key = JSON.stringify(store.get(path) ?? null);
        if (key === last) return;
        last = key; next(docSnap(path));
      };
      listeners.add(f); setTimeout(f, 0);
      return () => listeners.delete(f);
    },
    collection(sub: string) { return collRef(path + "/" + sub); },
  };
}
function collRef(c: string, filters: any[] = [], order: any = null, lim: number | null = null): any {
  const run = () => {
    let paths = [...store.keys()].filter((p) => collOf(p) === c);
    paths = paths.filter((p) => {
      const d = store.get(p) || {};
      return filters.every(([f, op, v]) => {
        const x = d[f];
        switch (op) {
          case "==": return x === v;
          case "!=": return x !== v;
          case "<": return x < v;
          case "<=": return x <= v;
          case ">": return x > v;
          case ">=": return x >= v;
          case "in": return Array.isArray(v) && v.includes(x);
          case "not-in": return Array.isArray(v) && !v.includes(x);
          case "array-contains": return Array.isArray(x) && x.includes(v);
          default: return true;
        }
      });
    });
    if (order) {
      const [f, dir] = order;
      paths.sort((a, b) => {
        const x = store.get(a)?.[f], y = store.get(b)?.[f];
        if (x === y) return 0;
        if (x === undefined) return 1;
        if (y === undefined) return -1;
        return (x < y ? -1 : 1) * (dir === "desc" ? -1 : 1);
      });
    } else paths.sort();
    if (lim) paths = paths.slice(0, lim);
    const docs = paths.map(docSnap);
    return { docs, size: docs.length, empty: !docs.length, docChanges: () => [], metadata: { fromCache: false, hasPendingWrites: false } };
  };
  return {
    path: c,
    where: (f: string, op: string, v: any) => collRef(c, [...filters, [f, op, v]], order, lim),
    orderBy: (f: string, dir = "asc") => collRef(c, filters, [f, dir], lim),
    limit: (n: number) => collRef(c, filters, order, n),
    async get() { return run(); },
    onSnapshot(next: any) {
      let last = "\u0000";
      const f = () => {
        const s = run();
        const key = JSON.stringify(s.docs.map((d: any) => [d.id, store.get(c + "/" + d.id)]));
        if (key === last) return;
        last = key; next(s);
      };
      listeners.add(f); setTimeout(f, 0);
      return () => listeners.delete(f);
    },
    doc: (id?: string) => docRef(c + "/" + (id || rid())),
    async add(data: any) { const r = docRef(c + "/" + rid()); await r.set(data); return r; },
  };
}
const db = { doc: (p: string) => docRef(p), collection: (p: string) => collRef(p) };

async function carregarDocs() {
  const a = await sb.from(TABELA).select("path,data").neq("collection", "atividade").limit(5000);
  if (a.error) throw a.error;
  const b = await sb.from(TABELA).select("path,data").eq("collection", "atividade")
    .order("updated_at", { ascending: false }).limit(800);
  if (b.error) throw b.error;
  [...(a.data || []), ...(b.data || [])].forEach((r: any) => store.set(r.path, r.data));
  sb.channel("estudio-docs")
    .on("postgres_changes", { event: "*", schema: "public", table: TABELA }, (pl: any) => {
      if (pl.eventType === "DELETE") store.delete(pl.old?.path);
      else if (pl.new?.path) store.set(pl.new.path, pl.new.data);
      notify();
    })
    .subscribe();
}

/* ---------------- pessoa conectada (user) ---------------- */
let uid = "", email = "", nomeProprio = "";
const PALETA = ["#1F3755", "#A8873F", "#2F6B4F", "#7A3E5C", "#3D5A80", "#8A5A12", "#4F5D75", "#6B4E2E"];
const corDe = (id: string) => PALETA[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % PALETA.length];
const perfis: Record<string, any> = {};
async function profiles(ids: string[] | string) {
  const lista = [...new Set([].concat(ids as any))].filter(Boolean) as string[];
  const faltam = lista.filter((i) => !perfis[i]);
  if (faltam.length) {
    const { data } = await sb.from("estudio_perfis").select("user_id,nome").in("user_id", faltam);
    (data || []).forEach((r: any) => (perfis[r.user_id] = r.nome || ""));
    faltam.forEach((i) => { if (perfis[i] === undefined) perfis[i] = ""; });
  }
  const out: Record<string, any> = {};
  lista.forEach((i) => (out[i] = { id: i, name: perfis[i] || "", avatarUrl: "", color: corDe(i), email: null, isMe: i === uid, guest: false }));
  return out;
}
const user = {
  isOwner: async () => false,
  canEdit: async () => true,
  can: async () => true,
  id: async () => uid,
  name: async () => nomeProprio,
  email: async () => email,
  avatarUrl: async () => null,
  me: async () => ({ id: uid, name: nomeProprio, avatarUrl: "", color: corDe(uid), email, isOwner: false, canEdit: true }),
  profiles,
  search: async () => [],
};

/* ---------------- presença (room) ---------------- */
function criarRoom() {
  const tab = rid();
  const chave = uid + ":" + tab;
  const ch = sb.channel("estudio-presenca", { config: { presence: { key: chave } } });
  let estado: any = {};
  let pronto = false;
  let cbs: any[] = [];
  let peers: any[] = [];
  ch.on("presence", { event: "sync" }, () => {
    const st = ch.presenceState();
    peers = Object.entries(st).map(([key, metas]: any) => {
      const m = metas[metas.length - 1] || {};
      return { peer: key, by: m.uid || null, isMe: m.uid === uid, sameTab: key === chave, kind: "viewer", guest: false, presence: m.p || {}, updatedAt: Date.now() };
    });
    cbs.forEach((f) => f({ peers, joined: [], left: [], updated: [] }));
  });
  ch.subscribe(async (status: string) => {
    if (status === "SUBSCRIBED") { pronto = true; await ch.track({ uid, p: estado }); }
  });
  return {
    async presence(patch: any) {
      estado = { ...estado, ...patch };
      Object.keys(estado).forEach((k) => estado[k] === null && delete estado[k]);
      if (pronto) { try { await ch.track({ uid, p: estado }); } catch { /* ignora */ } }
    },
    onPeers(fn: any) { cbs.push(fn); return () => { cbs = cbs.filter((x) => x !== fn); }; },
    peers: () => peers,
    emit: async () => {},
    on: () => () => {},
    connected: () => pronto,
  };
}

/* ---------------- Claude (sample), pela Edge Function "claude" ---------------- */
function jsonTolerante(t: string) {
  try { return JSON.parse(t); } catch { /* segue */ }
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) { try { return JSON.parse(fence[1]); } catch { /* segue */ } }
  const i = t.search(/[[{]/), j = Math.max(t.lastIndexOf("}"), t.lastIndexOf("]"));
  if (i >= 0 && j > i) { try { return JSON.parse(t.slice(i, j + 1)); } catch { /* segue */ } }
  throw { code: "invalid_json", message: "Resposta fora do formato", text: t };
}
const sample: any = async (input: any, opts: any = {}) => {
  if (opts.signal?.aborted) throw { code: "cancelled", message: "Cancelado" };
  const chamada = sb.functions.invoke("claude", { body: { input } });
  const cancelar = new Promise((_, rej) =>
    opts.signal?.addEventListener("abort", () => rej({ code: "cancelled", message: "Cancelado" })));
  const { data, error }: any = await Promise.race([chamada, cancelar]);
  if (error) {
    const st = error?.context?.status;
    throw { code: st === 429 ? "rate_limited" : st === 403 ? "not_granted" : "upstream_error", message: error.message };
  }
  if (data?.error) throw { code: data.code || "upstream_error", message: data.error };
  opts.onText?.({ text: data.text, delta: data.text });
  return { text: data.text || "", truncated: !!data.truncated };
};
sample.json = async (input: any, opts: any = {}) => {
  const extra = "\n\nResponda somente com o JSON pedido, sem texto antes ou depois.";
  const r = await sample(typeof input === "string" ? input + extra : input, opts);
  if (r.truncated) throw { code: "invalid_json", message: "Resposta cortada", text: r.text };
  return jsonTolerante(r.text);
};
sample.limits = async () => ({ maxInputBytes: 262144 });

/* ---------------- downloads e arquivos ---------------- */
const downloads = {
  async save({ filename, data }: any) {
    const blob = data instanceof Blob ? data : new Blob([data]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  },
};
const assets = {
  async upload(file: File) {
    const ext = (file.name?.split(".").pop() || "png").toLowerCase();
    const path = "arquivo-" + Date.now() + "." + ext;
    const { error } = await sb.storage.from(BUCKET).upload(path, file, { upsert: true, contentType: file.type });
    if (error) throw mapErr(error);
    const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
    return { id: path, url: data.publicUrl, sizeBytes: file.size, contentType: file.type };
  },
  list: async () => ({ assets: [], usage: {} }),
  delete: async () => {},
};

/* ---------------- tela de entrada ---------------- */
function telaEntrada(msg = "", modo: "entrar" | "criar" = "entrar") {
  document.getElementById("app")!.classList.add("login");
  const main = document.getElementById("main")!;
  main.innerHTML = `<div class="login-wrap"><div class="panel login-box">
    <div class="row" style="gap:8px"><span class="dia f"></span><span class="muted small">BHM Advogados</span></div>
    <h2>Estúdio de Pautas</h2>
    <p class="muted" style="margin:0">${modo === "entrar" ? "Entre com o e-mail liberado pelo administrador." : "Crie sua senha. Seu e-mail precisa estar liberado pelo administrador."}</p>
    ${msg ? `<p class="note warn" style="margin:0">${esc(msg)}</p>` : ""}
    ${modo === "criar" ? `<label class="f">Seu nome<input type="text" id="lNome" autocomplete="name"></label>` : ""}
    <label class="f">E-mail<input type="text" id="lEmail" autocomplete="email" inputmode="email"></label>
    <label class="f">Senha<input type="password" id="lSenha" autocomplete="${modo === "entrar" ? "current-password" : "new-password"}" style="width:100%;background:var(--panel);border:1px solid var(--line);border-radius:3px;padding:9px 11px"></label>
    <button class="btn pri" id="lOk" style="justify-content:center">${modo === "entrar" ? "Entrar" : "Criar acesso"}</button>
    <button class="btn ghost" id="lTroca">${modo === "entrar" ? "Primeiro acesso? Criar senha" : "Já tenho senha"}</button>
  </div></div>`;
  const ok = document.getElementById("lOk")!;
  document.getElementById("lTroca")!.onclick = () => telaEntrada("", modo === "entrar" ? "criar" : "entrar");
  const enviar = async () => {
    const em = (document.getElementById("lEmail") as HTMLInputElement).value.trim();
    const se = (document.getElementById("lSenha") as HTMLInputElement).value;
    if (!em || !se) return telaEntrada("Preencha e-mail e senha.", modo);
    ok.setAttribute("disabled", "");
    if (modo === "entrar") {
      const { error } = await sb.auth.signInWithPassword({ email: em, password: se });
      if (error) return telaEntrada("Não foi possível entrar: confira e-mail e senha.", modo);
    } else {
      const nome = (document.getElementById("lNome") as HTMLInputElement)?.value.trim() || "";
      const { data, error } = await sb.auth.signUp({ email: em, password: se, options: { data: { nome }, emailRedirectTo: location.origin } });
      if (error) return telaEntrada("Não foi possível criar o acesso: " + error.message, modo);
      if (!data.session) return telaEntrada("Enviamos um e-mail de confirmação. Confirme e depois entre aqui.", "entrar");
    }
    location.reload();
  };
  ok.onclick = enviar;
  main.querySelectorAll("input").forEach((i) => i.addEventListener("keydown", (e: any) => { if (e.key === "Enter") enviar(); }));
}

/* ---------------- início ---------------- */
export async function iniciarEstudio() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) return telaEntrada();
  uid = session.user.id;
  email = session.user.email || "";
  const { data: membro } = await sb.rpc("estudio_sou_membro");
  if (!membro) {
    await sb.auth.signOut();
    return telaEntrada("O e-mail " + email + " ainda não foi liberado. Peça ao administrador para incluí-lo na tabela estudio_acesso.");
  }
  const meta = session.user.user_metadata || {};
  const { data: perfil } = await sb.from("estudio_perfis").select("nome").eq("user_id", uid).maybeSingle();
  nomeProprio = perfil?.nome || meta.nome || "";
  if (!perfil && nomeProprio) await sb.from("estudio_perfis").upsert({ user_id: uid, nome: nomeProprio });
  perfis[uid] = nomeProprio;

  try { await carregarDocs(); } catch (e) { console.error(e); }
  const room = criarRoom();
  const caps: any = { db, user, room, sample, downloads, assets };
  (window as any).claude = { use: async (n: string) => caps[n] ?? null };
  (window as any).estudioSair = async () => { await sb.auth.signOut(); location.reload(); };

  document.getElementById("app")!.classList.remove("login");
  const s = document.createElement("script");
  s.src = "/estudio/app.js";
  document.body.appendChild(s);
}
