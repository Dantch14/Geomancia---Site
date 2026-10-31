// ============================================================
// components/Elemento.jsx
//
// A etiqueta com a bolinha colorida de cada elemento (Ar, Fogo, Água, Terra).
// Aparece na legenda, nas linhas de cada mãe e no painel de significado.
// ============================================================
import { CLASSE_ELEM, ELEM } from '../dados/figuras';

// Props:
//   indice : 0 = Ar, 1 = Fogo, 2 = Água, 3 = Terra
export default function Elemento({ indice }) {
  return (
    // Variáveis CSS (--c) em React vão dentro do objeto `style`.
    // O CSS usa var(--c) para pintar a bolinha (.el::before).
    <span className="el" style={{ '--c': `var(--${CLASSE_ELEM[indice]})` }}>
      {ELEM[indice]}
    </span>
  );
}
