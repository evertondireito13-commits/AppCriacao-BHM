# Estúdio de Pautas BHM

App da equipe de marketing da BHM Advogados: recebe um tema colado, classifica pela Fase 1, monta o pacote do dia da Fase 2, escreve o criativo, desenha a prévia dos slides no padrão do Manual de Padrão Visual e acompanha a pauta pelas oito etapas do Guia de Produção, com histórico de quem fez o quê.

Versão alinhada aos documentos de 16/10/2026 (Briefing, Fase 1, Fase 2, Guia de Produção e Manual de Padrão Visual). O que mudou está em `MUDANCAS.md`.

---

## Passo a passo: do zip ao app funcionando

Você vai precisar de:
- uma conta no **GitHub** (github.com, gratuita);
- uma conta no **Lovable** (lovable.dev);
- uma **chave da API da Anthropic** (console.anthropic.com → API Keys). O uso do Claude dentro do app é cobrado nessa conta;
- o arquivo `estudio-bhm-lovable.zip` **descompactado** no seu computador (clique com o botão direito → Extrair tudo).

Os nomes de botões do GitHub e do Lovable podem mudar com o tempo. Se algum não estiver igual, procure a opção equivalente.

### Parte 1. Criar o projeto no Lovable
1. Entre no Lovable e crie um projeto novo. Pode pedir algo simples, como “projeto em branco”.
2. Ative o **Lovable Cloud** no projeto (é o banco de dados e o login, feitos com Supabase). Sem ele, o app não encontra o arquivo `src/integrations/supabase/client.ts` e não funciona.

### Parte 2. Ligar o Lovable ao GitHub
1. Dentro do projeto no Lovable, abra a opção **GitHub** (fica no topo ou nas configurações do projeto).
2. Clique em **Connect** e autorize o aplicativo do Lovable na sua conta do GitHub.
3. Escolha a sua conta (ou a da BHM) e confirme. O Lovable **cria o repositório** sozinho.
4. A partir daí a sincronização é nos dois sentidos: o que entrar no branch principal (`main`) do GitHub aparece no Lovable, e o que o Lovable mudar aparece no GitHub.

Pelo que sei, o Lovable não importa um repositório que já existe. Por isso o caminho é ele criar o repositório e você colocar os arquivos dentro.

### Parte 3. Enviar os arquivos para o GitHub
**Caminho mais simples, pelo site:**
1. Abra o repositório no github.com (o Lovable mostra o link).
2. Clique em **Add file → Upload files**.
3. Abra a pasta `estudio-bhm-lovable` que você descompactou e **arraste o conteúdo dela**, não a pasta em si: as pastas `src`, `public` e `supabase` e os arquivos `README.md` e `MUDANCAS.md`. No Chrome ou no Edge, arrastar pastas funciona.
4. Embaixo, em **Commit changes**, escreva uma mensagem como “Estúdio de Pautas BHM”, deixe marcado **Commit directly to the main branch** e confirme.
5. Confira se os arquivos ficaram nos lugares certos:
   - `src/main.tsx` (substitui o que o Lovable criou)
   - `src/estudio/runtime.ts` e `src/estudio/estudio.css`
   - `public/estudio/app.js`
   - `supabase/migrations/20261012120000_estudio_pautas.sql`
   - `supabase/functions/claude/index.ts`

   Se tudo ficou dentro de uma pasta `estudio-bhm-lovable/`, você arrastou a pasta em vez do conteúdo: apague e envie de novo.

**Caminho alternativo, pelo GitHub Desktop** (melhor se você for atualizar o app com frequência):
1. Instale o GitHub Desktop (desktop.github.com) e entre com a sua conta.
2. **File → Clone repository**, escolha o repositório do Lovable e uma pasta no computador.
3. Copie para dentro dessa pasta o conteúdo de `estudio-bhm-lovable`, aceitando substituir o `src/main.tsx`.
4. No GitHub Desktop, escreva o resumo (“Estúdio de Pautas BHM”), clique em **Commit to main** e depois em **Push origin**.

### Parte 4. Ligar o banco e o Claude no Lovable
1. Volte ao Lovable e espere os arquivos aparecerem (alguns segundos).
2. Cole no chat do Lovable:

   > Aplique a migração `supabase/migrations/20261012120000_estudio_pautas.sql` no Lovable Cloud e implante a Edge Function `supabase/functions/claude`. Depois me peça o segredo `ANTHROPIC_API_KEY`. Não altere `public/estudio/app.js`, `src/estudio/runtime.ts` nem `src/main.tsx`, e não converta o app para React.

3. Quando ele pedir, cole a sua chave da API da Anthropic. O modelo padrão é `claude-sonnet-5-5`. Para trocar, crie o segredo `ANTHROPIC_MODEL` com outro nome de modelo (lista em docs.claude.com).

### Parte 5. Liberar a equipe
No banco do Lovable Cloud (Database ou editor SQL), rode com os e-mails reais:
```sql
insert into public.estudio_acesso (email, observacao) values
  ('everton@seudominio.com.br', 'Marketing'),
  ('bruno@seudominio.com.br', 'Dr. Bruno');
```
Só esses e-mails entram, leem e gravam. Para incluir alguém depois, rode o mesmo comando com o e-mail novo. Recomendado: deixar a confirmação de e-mail ligada nas configurações de autenticação.

### Parte 6. Primeiro uso
1. Abra a pré-visualização (ou o endereço publicado) do Lovable.
2. Clique em **Primeiro acesso? Criar senha**, crie a senha e escolha o seu papel.
3. Em **Equipe e referência**, envie as **duas versões da logo oficial**: o ícone claro (para fundo escuro) e o ícone navy (para fundo claro). Até lá, a prévia mostra um espaço reservado no lugar da logo.
4. No Painel, cole um tema e clique em **Montar a pauta com Claude**.

---

## Como atualizar o app depois
- **O app em si** (telas, etapas, regras das séries, prompts do Claude, prévia dos slides): `public/estudio/app.js`.
- **Cores e tipografia do app e dos slides**: `src/estudio/estudio.css`.
- Pelo site do GitHub: abra o arquivo, clique no lápis (**Edit**), altere e faça o commit no `main`. O Lovable recebe a mudança.
- Quando pedir algo ao Lovable, diga qual arquivo ele deve mexer e peça para não converter o app para React.
- Evite editar o mesmo arquivo ao mesmo tempo no Lovable e no GitHub.

## Problemas comuns
| O que aparece | O que fazer |
|---|---|
| Erro de build citando `@/integrations/supabase/client` | O Lovable Cloud não está ativado no projeto (Parte 1). |
| Tela branca ou a página padrão do Lovable | O `src/main.tsx` não foi substituído (Parte 3, item 5). |
| “O e-mail ainda não foi liberado” | Inclua o e-mail na tabela `estudio_acesso` (Parte 5). |
| “Claude não respondeu” | Confira se a função `claude` foi implantada e se o segredo `ANTHROPIC_API_KEY` existe (Parte 4). |
| A logo não aparece nos slides | Envie as duas versões em Equipe e referência. |

## O que tem em cada arquivo
- `src/main.tsx`: ponto de entrada.
- `src/estudio/runtime.ts`: conexão com o Supabase (login, banco, presença, Claude, arquivos).
- `src/estudio/estudio.css`: identidade visual da BHM e o desenho dos slides da prévia.
- `public/estudio/app.js`: o app.
- `supabase/migrations/…sql`: tabelas, regras de acesso, tempo real e armazenamento de logo e fotos.
- `supabase/functions/claude/index.ts`: chama a API da Anthropic sem expor a chave no navegador.

## Observações
- As pautas criadas na versão do claude.ai não vêm junto: o banco começa vazio.
- O texto do Claude aparece inteiro quando fica pronto.
- A prévia usa as fontes Cormorant Garamond e Inter carregadas do Google Fonts. A arte final continua sendo da agência, com a logo oficial.
- Fotos e logos enviadas ficam num bucket público do Supabase (endereço difícil de adivinhar, mas acessível por quem tiver o link).
