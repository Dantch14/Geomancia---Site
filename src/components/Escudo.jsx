// ============================================================
// components/Escudo.jsx
//
// O Escudo Geomântico: o contorno (SVG) e a grade de 16 colunas com as 15
// casas + o Conselho.
//
// ESTE É O COMPONENTE QUE GARANTE QUE NADA SAIA DO ESCUDO:
// depois de desenhado, medimos as casas e, se alguma ultrapassar o contorno,
// aumentamos o espaço abaixo da grade (ver utils/escudo.js).
// ============================================================
import { memo, useEffect, useLayoutEffect, useRef } from 'react';
import { ajustarEscudo } from '../utils/escudo';
import Celula from './Celula';

// Onde cada casa fica: [nó, linha, coluna].
// A grade tem 16 colunas e cada casa ocupa 2.
//   Direita : mães (linha 1) e, abaixo, as filhas (linha 2)
//   Esquerda: tias (linha 1) e, abaixo, as sobrinhas (linha 2)
//   Linha 3 : Futuro (esquerda) e Passado (direita)
//   Linha 4 : Juiz   |   Linha 5 (a ponta): Conselho
// Cada grupo é lido da esquerda para a direita (1ª, 2ª, 3ª, 4ª).
const posicoes = (N) => [
  [N.T[0], 1, 1], [N.T[1], 1, 3], [N.T[2], 1, 5], [N.T[3], 1, 7],
  [N.M[0], 1, 9], [N.M[1], 1, 11], [N.M[2], 1, 13], [N.M[3], 1, 15],
  [N.S[0], 2, 2], [N.S[1], 2, 6],
  [N.F[0], 2, 10], [N.F[1], 2, 14],
  [N.FU, 3, 4], [N.P, 3, 12],
  [N.J, 4, 8],
  [N.C, 5, 8],
];

// Props:
//   N       : os nós do mapa
//   onAbrir : repassado a cada casa
function Escudo({ N, onAbrir }) {
  // useRef dá acesso direto ao elemento HTML real, para podermos MEDIR.
  const escudoRef = useRef(null);

  // useLayoutEffect roda logo depois do React atualizar a tela e ANTES do
  // navegador pintar. Assim o ajuste acontece sem o usuário ver a casa
  // "saindo" do escudo por um instante.
  // Roda de novo sempre que `N` muda (nomes diferentes mudam o tamanho das casas).
  useLayoutEffect(() => {
    ajustarEscudo(escudoRef.current);
  }, [N]);

  // O tamanho também muda quando a janela é redimensionada ou quando as
  // fontes terminam de carregar, então reajustamos nesses dois casos.
  // useEffect com [] roda uma vez, ao aparecer na tela.
  useEffect(() => {
    let quadro = 0;
    // requestAnimationFrame agrupa vários eventos de "resize" em um ajuste só
    // por quadro, em vez de recalcular dezenas de vezes enquanto arrasta.
    const reajustar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => ajustarEscudo(escudoRef.current));
    };
    window.addEventListener('resize', reajustar);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(reajustar);

    // Função de limpeza: roda quando o componente sai da tela.
    return () => {
      window.removeEventListener('resize', reajustar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <div className="escudo" ref={escudoRef}>
      {/* Contorno: 100x100 esticado ao tamanho do escudo (preserveAspectRatio="none"). */}
      <svg
        className="escudo-borda"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 0H100V50C100 78 74 90 50 100C26 90 0 78 0 50Z" />
      </svg>

      <div className="escudo-grade">
        {posicoes(N).map(([no, linha, coluna]) => (
          <Celula key={no.id} no={no} linha={linha} coluna={coluna} onAbrir={onAbrir} />
        ))}
      </div>
    </div>
  );
}

export default memo(Escudo);
