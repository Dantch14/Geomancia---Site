// ============================================================
// main.jsx
// O PONTO DE ENTRADA: é o primeiro arquivo que roda. Ele "pendura" o
// componente <App /> dentro da <div id="root"> do index.html.
// ============================================================
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './estilos/style.css'; // o CSS do site (o mesmo do original)

// StrictMode só ajuda durante o desenvolvimento: avisa de erros comuns e
// não faz nada no site final.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
