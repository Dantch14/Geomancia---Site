// ============================================================
// components/Painel.jsx
// O painel de significado (o "bottom sheet" que sobe ao tocar numa casa do
// escudo). É um diálogo: tem fundo escuro, botão de fechar e fecha com Esc.
// ============================================================
import { useEffect, useRef } from 'react';
import { ELEM, figura } from '../dados/figuras';
import Elemento from './Elemento';
import Peca from './Peca';

// Props:
//   no       : o nó cuja figura será explicada
//   origem   : o botão que abriu o painel (para devolver o foco ao fechar)
//   onFechar : função que fecha o painel
export default function Painel({ no, origem, onFechar }) {
  const botaoFechar = useRef(null);
  const f = figura(no.l);

  // Ao abrir: manda o foco do teclado para o botão "×" (acessibilidade).
  // Ao fechar (função de retorno): devolve o foco ao botão que abriu.
  useEffect(() => {
    botaoFechar.current.focus();
    return () => {
      if (origem && origem.isConnected) origem.focus();
    };
  }, [origem]);

  // Tecla Esc fecha o painel.
  useEffect(() => {
    const aoTeclar = (e) => {
      if (e.key === 'Escape') onFechar();
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar); // limpeza
  }, [onFechar]);

  // Segurança: sem figura completa não há o que mostrar.
  if (!f) return null;

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      {/* Clicar no fundo escuro também fecha. */}
      <div className="sheet-fundo" onClick={onFechar} />
      <div className="sheet-painel">
        <button
          type="button"
          className="sheet-x"
          aria-label="Fechar"
          ref={botaoFechar}
          onClick={onFechar}
        >
          ×
        </button>

        <div>
          <div className="sh-top">
            <Peca l={no.l} />
            <div>
              <div className="sh-rot">{no.papel} · {no.f}</div>
              <h3 id="sheet-title">{f.nome}</h3>
              <div className="sh-pt">{f.pt}</div>
              <div className="sh-comp">{f.comp}</div>
            </div>
          </div>

          <p className="sh-desc">{f.desc}</p>

          {/* Resumo linha por linha: elemento, ímpar/par e quantidade de pontos. */}
          <ul className="sh-linhas">
            {ELEM.map((nome, k) => (
              <li key={nome}>
                <Elemento indice={k} />
                <span>{no.l[k] === 1 ? 'ímpar' : 'par'}</span>
                <span className="sh-pts">{no.l[k] === 1 ? '●' : '●●'}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
