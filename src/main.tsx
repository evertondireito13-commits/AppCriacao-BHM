// Estúdio de Pautas BHM: ponto de entrada.
// Monta a estrutura da página, faz o login pelo Supabase (Lovable Cloud)
// e carrega a aplicação em /public/estudio/app.js.
import "./estudio/estudio.css";
import { iniciarEstudio } from "./estudio/runtime";

const root = document.getElementById("root")!;
root.innerHTML = `
  <div class="app" id="app">
    <aside class="side" id="side"></aside>
    <main class="main" id="main"><p class="muted">Carregando o estúdio…</p></main>
  </div>
  <div id="modal"></div>
  <div id="toast" class="toast" hidden></div>`;

iniciarEstudio();
