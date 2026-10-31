// ============================================================
// components/SecaoCatalogo.jsx
// O catálogo das 16 figuras, com busca por nome ou elemento. As figuras que
// aparecem no mapa atual ganham borda e etiquetas.
// ============================================================
import { useMemo, useState } from 'react';
import { FIGURAS, indiceFig, listaNos } from '../dados/figuras';
import { normalizar } from '../utils/leitura';
import CartaoFigura from './CartaoFigura';
import Secao from './Secao';

// Texto de busca de cada figura, preparado UMA vez (não muda nunca),
// já sem acentos e em minúsculas.
const TEXTOS_BUSCA = FIGURAS.map((f) => normalizar(`${f.nome} ${f.pt} ${f.comp}`));

// Props:
//   N : nós do mapa (para descobrir onde cada figura apareceu)
export default function SecaoCatalogo({ N }) {
  // Estado local: só este componente precisa saber o que foi digitado na busca.
  const [busca, setBusca] = useState('');

  // Para cada figura (0..15), a lista de papéis que ela ocupa no mapa.
  // Ex.: { 1: ['Mãe 1', 'Mãe 4'], 7: ['Juiz'] }
  const papeisPorFigura = useMemo(() => {
    const mapa = {};
    listaNos(N).forEach((n) => {
      const i = indiceFig(n.l);
      if (i >= 0) (mapa[i] = mapa[i] || []).push(n.papel);
    });
    return mapa;
  }, [N]);

  // Índices das figuras que combinam com a busca.
  const visiveis = useMemo(() => {
    const q = normalizar(busca.trim());
    return FIGURAS.map((_, i) => i).filter((i) => !q || TEXTOS_BUSCA[i].includes(q));
  }, [busca]);

  return (
    <Secao idTitulo="h-cat">
      <h2 id="h-cat">As 16 figuras</h2>
      <p className="sub" style={{ marginBottom: '16px' }}>
        Todas as combinações possíveis de quatro linhas. As figuras que
        aparecem no seu mapa levam a posição marcada.
      </p>

      <div className="busca">
        <label htmlFor="busca" className="vh">Buscar figura</label>
        <input
          id="busca"
          type="search"
          placeholder="Buscar por nome ou elemento"
          autoComplete="off"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="cat-grid">
        {visiveis.map((i) => (
          <CartaoFigura key={FIGURAS[i].nome} fig={FIGURAS[i]} papeis={papeisPorFigura[i] || []} />
        ))}
      </div>

      {visiveis.length === 0 && <p className="vazio">Nenhuma figura encontrada.</p>}
    </Secao>
  );
}
