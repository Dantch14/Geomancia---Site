// ============================================================
// components/CartaoFigura.jsx
// Um cartão do catálogo das 16 figuras.
// ============================================================
import { memo } from 'react';
import Peca from './Peca';

// Props:
//   fig    : os dados da figura (nome, pt, comp, desc, l...)
//   papeis : lista dos papéis que esta figura ocupa no mapa atual
//            (ex.: ['Mãe 1', 'Juiz']). Vazia = a figura não saiu na tiragem.
function CartaoFigura({ fig, papeis }) {
  const ativa = papeis.length > 0;
  return (
    <article className={'fig' + (ativa ? ' ativa' : '')}>
      <Peca l={fig.l} />
      <div>
        <h3>{fig.nome}</h3>
        <div className="pt">{fig.pt}</div>
        <div className="comp">{fig.comp}</div>
        <p>{fig.desc}</p>
        {/* Etiquetas com os lugares onde a figura apareceu no mapa. */}
        {ativa && (
          <div className="chips">
            {papeis.map((p) => <span className="chip" key={p}>{p}</span>)}
          </div>
        )}
      </div>
    </article>
  );
}

// Compara `papeis` pelo conteúdo, porque a lista é recriada a cada cálculo.
export default memo(
  CartaoFigura,
  (a, b) => a.fig === b.fig && a.papeis.join('|') === b.papeis.join('|')
);
