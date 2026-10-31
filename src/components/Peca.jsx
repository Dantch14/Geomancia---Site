// ============================================================
// components/Peca.jsx
//
// A "peça": o retângulo colorido com os pontos de UMA figura.
// É o componente mais reutilizado do site (mães, mapa, leitura, catálogo
// e painel usam todos o mesmo desenho).
//
// Componente = função com nome em MAIÚSCULA que devolve JSX.
// Props       = os parâmetros, recebidos entre chaves.
// ============================================================
import { Fragment, memo } from 'react';
import { figura } from '../dados/figuras';

// Props:
//   l : as 4 linhas da figura, ex.: [1, 2, 1, 1] (null = linha sem marca)
function Peca({ l }) {
  // Se as 4 linhas formam uma figura conhecida, ela dá a cor da peça.
  const f = figura(l);

  return (
    // viewBox="0 0 64 88" cria um "plano" de 64x88 unidades. O SVG escala
    // sozinho para qualquer tamanho (a largura real vem do CSS: .tile).
    <svg className="tile" viewBox="0 0 64 88" aria-hidden="true" focusable="false">
      {/* Fundo: colorido se a figura existe, tracejado/cinza se estiver incompleta.
          Em JSX, `condição ? A : B` escolhe o que desenhar. */}
      {f ? (
        <rect
          x="1" y="1" width="62" height="86" rx="5"
          fill={f.cor}
          stroke="#1B2050" strokeOpacity=".45" strokeWidth="2"
        />
      ) : (
        <rect className="tile-vazio" width="64" height="88" rx="5" />
      )}

      {/* Uma linha de pontos para cada uma das 4 linhas. */}
      {l.map((v, r) => {
        const y = 16 + r * 20; // altura da linha r (16, 36, 56, 76)
        // `key` ajuda o React a identificar cada item de uma lista.
        if (v === 1) {
          // Ímpar: UM ponto no meio.
          return <circle key={r} className="dot" cx="32" cy={y} r="8" />;
        }
        if (v === 2) {
          // Par: DOIS pontos, um de cada lado.
          // Fragment (<>…</>) agrupa elementos sem criar uma tag extra no HTML.
          return (
            <Fragment key={r}>
              <circle className="dot" cx="18" cy={y} r="8" />
              <circle className="dot" cx="46" cy={y} r="8" />
            </Fragment>
          );
        }
        // Linha ainda não marcada: um círculo pequeno e tracejado.
        return <circle key={r} className="dot-vazio" cx="32" cy={y} r="4.5" />;
      })}
    </svg>
  );
}

// memo(): o React só redesenha a peça se as linhas realmente mudarem.
// Comparamos o CONTEÚDO (join) e não a referência da lista, porque a lista
// é recriada a cada cálculo, mesmo quando os valores são os mesmos.
export default memo(Peca, (antes, depois) => antes.l.join() === depois.l.join());
