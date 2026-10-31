// ============================================================
// vite.config.js
// Configuração do Vite, a ferramenta que roda e empacota o projeto.
// ============================================================
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `mode` vem do comando:
//   npm run build         -> mode "production" (vários arquivos na pasta dist)
//   npm run build:single  -> mode "single"     (UM único .html, que abre com duplo clique)
export default defineConfig(({ mode }) => ({
  // './' faz os caminhos serem relativos, então o site funciona em qualquer pasta.
  base: './',
  plugins: [
    react(), // entende JSX e liga o "hot reload" no modo dev
    // Só embute tudo num único HTML quando pedimos o build "single".
    mode === 'single' && viteSingleFile(),
  ],
}));
