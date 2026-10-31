// ============================================================
// components/CartaoResultado.jsx
// Cartão de um resultado da leitura (Passado, Futuro, Juiz ou Conselho):
// peça, nome, composição, significado e de onde a figura veio.
// ============================================================
import { memo } from 'react';
import { figura } from '../dados/figuras';
import Peca from './Peca';

// Props:
//   no : o nó a mostrar
function CartaoResultado({ no }) {
  const f = figura(no.l);
  return (
    // O Juiz ganha a classe extra "juiz" (borda e rótulo em vermelho).
    <article className={'res' + (no.papel === 'Juiz' ? ' juiz' : '')}>
      <div className="res-rot">{no.papel}</div>
      <div className="res-top">
        <Peca l={no.l} />
        <div>
          <div className="res-nome">{f ? f.nome : '—'}</div>
          <div className="res-pt">{f ? f.pt : 'aguardando as mães'}</div>
        </div>
      </div>
      {/* Fragment: agrupa os dois elementos sem criar uma tag a mais. */}
      {f && (
        <>
          <div className="res-comp">{f.comp}</div>
          <p>{f.desc}</p>
        </>
      )}
      <div className="res-f">{no.f}</div>
    </article>
  );
}

export default memo(CartaoResultado);
