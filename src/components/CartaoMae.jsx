// ============================================================
// components/CartaoMae.jsx
// O cartão de UMA mãe: nome da figura, peça, seletor e os 8 botões de pontos
// (2 por linha x 4 linhas).
// ============================================================
import { memo } from 'react';
import { ELEM, FIGURAS, figura, indiceFig } from '../dados/figuras';
import Elemento from './Elemento';
import Peca from './Peca';
import PontosOpcao from './PontosOpcao';

// Props:
//   indice      : 0 a 3 (qual mãe é esta)
//   linhas      : as 4 linhas desta mãe, ex.: [1, null, 2, 1]
//   onAlternar  : (mae, linha, valor) => void   -> clique num botão de pontos
//   onEscolher  : (mae, indiceFigura) => void   -> escolha no <select>
function CartaoMae({ indice: i, linhas, onAlternar, onEscolher }) {
  const f = figura(linhas); // figura formada, ou null se incompleta
  const idx = indiceFig(linhas); // 0..15, ou -1

  // Texto pequeno abaixo do nome: tradução, ou uma dica do que falta.
  const subtitulo = f
    ? f.pt
    : linhas.some((v) => v) ? 'faltam linhas' : 'marque as linhas';

  return (
    <article className="mae" aria-labelledby={`mae-t-${i}`}>
      <div className="mae-head">
        <div>
          <div className="mae-rot" id={`mae-t-${i}`}>{i + 1}ª mãe</div>
          <div className="mae-nome">{f ? f.nome : '—'}</div>
          <div className="mae-pt">{subtitulo}</div>
        </div>
        <div>
          <Peca l={linhas} />
        </div>
      </div>

      {/* Escolher a figura pelo nome preenche as 4 linhas de uma vez.
          `value` controla qual opção aparece escolhida. */}
      <select
        id={`sel-${i}`}
        aria-label={`Escolher a figura da ${i + 1}ª mãe`}
        value={f ? String(idx) : ''}
        onChange={(e) => {
          // Ignora a opção vazia ("Escolher figura…").
          if (e.target.value !== '') onEscolher(i, Number(e.target.value));
        }}
      >
        <option value="">Escolher figura…</option>
        {FIGURAS.map((fig, k) => (
          <option key={fig.nome} value={k}>{fig.nome} · {fig.pt}</option>
        ))}
      </select>

      {/* As 4 linhas (Ar, Fogo, Água, Terra), cada uma com 2 botões. */}
      <div className="linhas" role="group" aria-label={`Linhas da ${i + 1}ª mãe`}>
        {ELEM.map((nome, k) => (
          <div className="linha" key={nome}>
            <Elemento indice={k} />
            {/* aria-pressed informa a leitores de tela se o botão está marcado */}
            <button
              type="button"
              className="opt"
              aria-pressed={linhas[k] === 1}
              aria-label={`${nome}: ímpar, um ponto`}
              onClick={() => onAlternar(i, k, 1)}
            >
              <PontosOpcao quantidade={1} />
            </button>
            <button
              type="button"
              className="opt"
              aria-pressed={linhas[k] === 2}
              aria-label={`${nome}: par, dois pontos`}
              onClick={() => onAlternar(i, k, 2)}
            >
              <PontosOpcao quantidade={2} />
            </button>
          </div>
        ))}
      </div>
    </article>
  );
}

// memo: ao mexer numa mãe, as outras 3 NÃO redesenham (as props delas não mudaram).
export default memo(CartaoMae);
