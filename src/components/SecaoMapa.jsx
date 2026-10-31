// ============================================================
// components/SecaoMapa.jsx
// A seção do mapa completo: título, botão "Salvar imagem", o escudo dentro
// do bloco #captura (que vira a foto), as notas e a regra de soma.
// ============================================================
import { useRef, useState } from 'react';
import { useAviso } from '../hooks/useAviso';
import { entregarImagem, gerarImagemDoEscudo } from '../utils/imagem';
import Escudo from './Escudo';
import NotasMapa from './NotasMapa';
import Secao from './Secao';

// Props:
//   N        : nós do mapa
//   pergunta : texto da pergunta (aparece no mapa e na imagem)
//   regra    : 'usuario' | 'classica' (só escolhe o texto de ajuda)
//   onAbrir  : abre o painel de significado
export default function SecaoMapa({ N, pergunta, regra, onAbrir }) {
  // Referência ao bloco que será fotografado.
  const capturaRef = useRef(null);
  const [aviso, mostrarAviso, limparAviso] = useAviso(2600);
  const [gerando, setGerando] = useState(false);

  const perguntaLimpa = pergunta.trim();

  // Clique em "Salvar imagem". `async/await` espera as etapas demoradas
  // (gerar a foto, abrir o compartilhamento) sem travar a tela.
  async function salvarImagem() {
    if (gerando) return;
    setGerando(true);
    mostrarAviso('Gerando…', 0); // 0 = fica na tela até trocarmos
    try {
      const blob = await gerarImagemDoEscudo(capturaRef.current);
      const resultado = await entregarImagem(blob);
      if (resultado === 'cancelado') limparAviso();
      else mostrarAviso(resultado === 'compartilhado' ? 'Imagem pronta' : 'Imagem salva');
    } catch (_) {
      mostrarAviso('Não foi possível gerar a imagem');
    } finally {
      setGerando(false); // roda com sucesso ou com erro
    }
  }

  return (
    <Secao idTitulo="h-mapa">
      <div className="sec-head">
        <div>
          <h2 id="h-mapa">Mapa completo</h2>
          <p className="sub">
            O Escudo Geomântico: as 15 casas, da tiragem ao juiz, mais o
            conselho. Toque numa figura para ver o significado.
          </p>
        </div>
        <div className="sec-act">
          <span className="status" role="status">{aviso}</span>
          <button
            type="button"
            className="btn btn-primario"
            disabled={gerando}
            onClick={salvarImagem}
          >
            {/* Ícone de "baixar": seta para baixo sobre uma linha */}
            <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3v10M6 9.5l4 4 4-4M4 16.5h12" />
            </svg>
            Salvar imagem
          </button>
        </div>
      </div>

      <div className="regra">
        {/* O site original deixava aqui uma caixinha de seletor de regra, hoje
            sem botões. Ela é mantida (vazia e escondida de leitores de tela)
            só porque o espaçamento dela faz parte do visual original. */}
        <div className="seg" aria-hidden="true" />
        <p className="regra-nota">
          {regra === 'classica'
            ? 'O conselho é formado pela primeira filha com o passado.'
            : 'O juiz é formado pelo passado com o futuro.'}
        </p>
      </div>

      {/* #captura é tudo o que aparece na imagem salva. Os elementos
          .foto-cab e .foto-rodape ficam escondidos na tela e só aparecem na foto. */}
      <div id="captura" className="captura" ref={capturaRef}>
        <div className="foto-cab">
          <p className="foto-eyebrow">Mapa Geomântico</p>
          <p className="foto-titulo">Escudo Geomântico</p>
        </div>

        {/* `&&`: só desenha a pergunta se houver texto. */}
        {perguntaLimpa && (
          <div className="mapa-pergunta">
            <div className="mapa-pergunta-rot">Pergunta</div>
            <p>{perguntaLimpa}</p>
          </div>
        )}

        <div id="mapa">
          <Escudo N={N} onAbrir={onAbrir} />
        </div>

        {/* Vazio na tela; o texto com a data é colocado só na cópia usada para a foto. */}
        <p className="foto-rodape" />
      </div>

      <NotasMapa />

      <p className="soma">
        Soma de linhas: ímpar + par = ímpar · ímpar + ímpar = par · par + par = par
      </p>
    </Secao>
  );
}
