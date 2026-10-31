// ============================================================
// hooks/useGeomancia.js
//
// O ESTADO do site inteiro fica aqui. "Estado" é a memória do React: os
// dados que, quando mudam, fazem a tela se redesenhar sozinha.
//
// Estado guardado:
//   maes     : as 4 mães, cada uma com 4 linhas (1, 2 ou null)
//   regra    : 'usuario' | 'classica' (só muda o texto de ajuda do mapa)
//   pergunta : o texto da pergunta
//
// Tudo o que dá para CALCULAR a partir disso (tias, filhas, juiz...) NÃO é
// guardado: é derivado com useMemo. Guardar só o essencial evita dados
// que ficam fora de sincronia.
// ============================================================
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FIGURAS, calcular, indiceFig, montarNos } from '../dados/figuras';

// Mães do exemplo (botão "Carregar exemplo" e estado inicial).
export const EXEMPLO = [[1, 2, 1, 1], [1, 1, 2, 1], [2, 1, 1, 1], [1, 2, 1, 1]];
const VAZIAS = () => [0, 1, 2, 3].map(() => [null, null, null, null]);

// Chave usada no localStorage do navegador (mesma do site original, então
// quem já usou continua com os dados salvos).
const CHAVE = 'mapa-geomantico:v1';

// Lê o que foi salvo da última vez, com validação, para um dado quebrado
// ou antigo nunca derrubar o site. Roda UMA vez, no começo.
function lerSalvo() {
  const padrao = {
    maes: EXEMPLO.map((l) => l.slice()),
    regra: 'usuario',
    pergunta: '',
  };
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return padrao;
    const d = JSON.parse(bruto);

    // As mães só valem se forem 4 listas de 4 valores (1, 2 ou null).
    const ok =
      Array.isArray(d.maes) &&
      d.maes.length === 4 &&
      d.maes.every(
        (l) =>
          Array.isArray(l) &&
          l.length === 4 &&
          l.every((v) => v === 1 || v === 2 || v === null)
      );
    if (ok) padrao.maes = d.maes;
    if (d.regra === 'classica' || d.regra === 'usuario') padrao.regra = d.regra;
    if (typeof d.pergunta === 'string') padrao.pergunta = d.pergunta.slice(0, 300);
  } catch (_) {
    /* localStorage bloqueado ou JSON inválido: usa o padrão */
  }
  return padrao;
}

export function useGeomancia() {
  // Passar uma FUNÇÃO ao useState (lazy initializer) faz ela rodar só na
  // primeira vez, e não a cada redesenho.
  const [estado, setEstado] = useState(lerSalvo);

  // Sempre que o estado muda, salva no navegador.
  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(estado));
    } catch (_) {
      /* sem espaço ou bloqueado: ignora */
    }
  }, [estado]);

  // ---- AÇÕES ----
  // useCallback mantém a MESMA função entre redesenhos. Assim os componentes
  // memorizados (React.memo) não redesenham à toa só porque ganharam uma
  // função "nova" a cada vez.
  // Regra de ouro do React: nunca alterar o estado diretamente; sempre criar
  // uma CÓPIA nova (por isso os .map e o spread `...e`).

  // Clicar num ponto: marca; clicar de novo no mesmo, desmarca.
  //   m = índice da mãe, k = índice da linha, v = valor clicado (1 ou 2)
  const alternarLinha = useCallback((m, k, v) => {
    setEstado((e) => ({
      ...e,
      maes: e.maes.map((linhas, i) =>
        i !== m
          ? linhas // as outras mães continuam idênticas (mesma referência)
          : linhas.map((x, j) => (j !== k ? x : x === v ? null : v))
      ),
    }));
  }, []);

  // Escolher uma figura pelo nome no <select>: preenche as 4 linhas de uma vez.
  const escolherFigura = useCallback((m, indiceDaFigura) => {
    setEstado((e) => ({
      ...e,
      maes: e.maes.map((linhas, i) =>
        i === m ? FIGURAS[indiceDaFigura].l.slice() : linhas
      ),
    }));
  }, []);

  const carregarExemplo = useCallback(
    () => setEstado((e) => ({ ...e, maes: EXEMPLO.map((l) => l.slice()) })),
    []
  );
  const limpar = useCallback(
    () => setEstado((e) => ({ ...e, maes: VAZIAS() })),
    []
  );
  const definirPergunta = useCallback(
    (texto) => setEstado((e) => ({ ...e, pergunta: texto })),
    []
  );

  // ---- DADOS DERIVADOS ----
  // useMemo só recalcula quando as dependências (2º argumento) mudam.
  // Digitar na pergunta, por exemplo, NÃO refaz estas contas.
  const resultado = useMemo(() => calcular(estado.maes), [estado.maes]);
  const N = useMemo(() => montarNos(resultado), [resultado]);

  const marcadas = useMemo(
    () => estado.maes.flat().filter(Boolean).length,
    [estado.maes]
  );
  const ehExemplo = useMemo(
    () => JSON.stringify(estado.maes) === JSON.stringify(EXEMPLO),
    [estado.maes]
  );
  // As 4 mães formam figuras completas? (libera o botão "Copiar leitura")
  const completo = useMemo(
    () => estado.maes.every((l) => indiceFig(l) >= 0),
    [estado.maes]
  );

  return {
    estado,
    N,
    marcadas,
    ehExemplo,
    completo,
    alternarLinha,
    escolherFigura,
    carregarExemplo,
    limpar,
    definirPergunta,
  };
}
