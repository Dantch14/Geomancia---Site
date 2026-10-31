// ============================================================
// components/SecaoLeitura.jsx
// Passado, futuro, juiz e conselho, mais o botão "Copiar leitura".
// ============================================================
import { useAviso } from '../hooks/useAviso';
import { copiarTexto, textoLeitura } from '../utils/leitura';
import CartaoResultado from './CartaoResultado';
import Secao from './Secao';

// Props:
//   N        : nós do mapa
//   pergunta : pergunta digitada (entra no texto copiado)
//   completo : as 4 mães estão completas? (senão o botão fica desativado)
export default function SecaoLeitura({ N, pergunta, completo }) {
  const [aviso, mostrarAviso] = useAviso(2200);

  async function copiar() {
    // O texto é montado só no clique, quando precisamos dele.
    const ok = await copiarTexto(textoLeitura(N, pergunta));
    mostrarAviso(ok ? 'Copiado' : 'Não foi possível copiar');
  }

  return (
    <Secao idTitulo="h-leitura">
      <div className="sec-head">
        <div>
          <h2 id="h-leitura">Leitura</h2>
          <p className="sub">Passado, futuro, juiz e conselho da tiragem.</p>
        </div>
        <div className="sec-act">
          <span className="status" role="status">{aviso}</span>
          <button type="button" className="btn" disabled={!completo} onClick={copiar}>
            Copiar leitura
          </button>
        </div>
      </div>

      <div className="leitura">
        {/* Os 4 resultados, na ordem de leitura. */}
        {[N.P, N.FU, N.J, N.C].map((no) => (
          <CartaoResultado key={no.id} no={no} />
        ))}
      </div>
    </Secao>
  );
}
