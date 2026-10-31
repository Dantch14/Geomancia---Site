// ============================================================
// App.jsx
//
// O componente PRINCIPAL. Ele não desenha detalhes: só junta as peças
// (componentes) e distribui os dados e as ações para cada uma.
//
// Fluxo dos dados no React:
//   - dados descem do pai para os filhos, via PROPS;
//   - ações sobem dos filhos para o pai, via FUNÇÕES passadas como props.
// ============================================================
import { useCallback, useState } from 'react';
import Cabecalho from './components/Cabecalho';
import Painel from './components/Painel';
import SecaoCatalogo from './components/SecaoCatalogo';
import SecaoLeitura from './components/SecaoLeitura';
import SecaoMaes from './components/SecaoMaes';
import SecaoMapa from './components/SecaoMapa';
import SecaoPergunta from './components/SecaoPergunta';
import { useGeomancia } from './hooks/useGeomancia';

export default function App() {
  // Todo o estado e as ações do site vêm deste hook (hooks/useGeomancia.js).
  const {
    estado, N, marcadas, ehExemplo, completo,
    alternarLinha, escolherFigura, carregarExemplo, limpar, definirPergunta,
  } = useGeomancia();

  // Estado só da interface: qual casa está aberta no painel.
  // null = painel fechado; senão { no, origem }.
  const [aberto, setAberto] = useState(null);

  // useCallback mantém a mesma função entre redesenhos, e assim o escudo
  // (memorizado) não é redesenhado sem necessidade.
  const abrir = useCallback((no, origem) => setAberto({ no, origem }), []);
  const fechar = useCallback(() => setAberto(null), []);

  return (
    // <>…</> é um Fragment: devolve vários elementos irmãos sem uma <div> extra.
    <>
      <Cabecalho />

      <main>
        <SecaoPergunta valor={estado.pergunta} onMudar={definirPergunta} />

        <SecaoMaes
          maes={estado.maes}
          marcadas={marcadas}
          ehExemplo={ehExemplo}
          onAlternar={alternarLinha}
          onEscolher={escolherFigura}
          onExemplo={carregarExemplo}
          onLimpar={limpar}
        />

        <SecaoMapa
          N={N}
          pergunta={estado.pergunta}
          regra={estado.regra}
          onAbrir={abrir}
        />

        <SecaoLeitura N={N} pergunta={estado.pergunta} completo={completo} />

        <SecaoCatalogo N={N} />
      </main>

      {/* O painel só existe enquanto `aberto` não for null. */}
      {aberto && <Painel no={aberto.no} origem={aberto.origem} onFechar={fechar} />}
    </>
  );
}
