// ============================================================
// components/Celula.jsx
// UMA casa do escudo: um botão com rótulo, peça, nome e fórmula.
// Clicar abre o painel com o significado (se a figura estiver completa).
// ============================================================
import { memo } from 'react';
import { figura } from '../dados/figuras';
import Peca from './Peca';

// Props:
//   no      : o nó (ver montarNos em dados/figuras.js)
//   linha   : linha da grade onde a casa fica (1 a 5)
//   coluna  : coluna inicial da grade (cada casa ocupa 2 das 16 colunas)
//   onAbrir : (no, elementoClicado) => void
function Celula({ no, linha, coluna, onAbrir }) {
  const f = figura(no.l);

  // Monta a lista de classes: Juiz e Conselho têm destaque próprio no CSS.
  const classe =
    'cell' +
    (no.papel === 'Juiz' ? ' juiz' : '') +
    (no.papel === 'Conselho' ? ' conselho' : '');

  return (
    <button
      type="button"
      className={classe}
      // Posição na grade CSS: "coluna / span 2" = começa na coluna e ocupa 2.
      style={{ gridRow: linha, gridColumn: `${coluna} / span 2` }}
      // Sem figura completa, não há significado para mostrar: botão desativado.
      disabled={!f}
      aria-label={`${no.rot}: ${f ? f.nome : 'ainda sem figura'}`}
      // currentTarget é o próprio botão; o painel o usa para devolver o foco ao fechar.
      onClick={(e) => onAbrir(no, e.currentTarget)}
    >
      <span className="cell-rot">{no.papel}</span>
      <Peca l={no.l} />
      <span className="cell-nome">{f ? f.nome : '—'}</span>
      <span className="cell-f">{no.f}</span>
    </button>
  );
}

export default memo(Celula);
