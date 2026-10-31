// ============================================================
// components/SecaoMaes.jsx
// A seção de entrada: legenda, botões "Carregar exemplo"/"Limpar" e os
// quatro cartões das mães.
// ============================================================
import CartaoMae from './CartaoMae';
import Elemento from './Elemento';
import Secao from './Secao';

// Props:
//   maes, marcadas, ehExemplo : dados vindos do estado
//   onAlternar, onEscolher, onExemplo, onLimpar : ações vindas do estado
export default function SecaoMaes({
  maes, marcadas, ehExemplo,
  onAlternar, onEscolher, onExemplo, onLimpar,
}) {
  return (
    <Secao idTitulo="h-maes">
      <h2 id="h-maes">As quatro mães</h2>
      <p className="sub">
        Cada figura tem quatro linhas, de cima para baixo. Em cada uma, marque
        um ponto (ímpar) ou dois pontos (par). Também dá para escolher a figura
        pelo nome.
      </p>

      <div className="legenda" aria-label="Legenda das linhas">
        <span>De cima para baixo</span>
        {/* Os 4 elementos, gerados por um laço em vez de 4 linhas repetidas. */}
        {[0, 1, 2, 3].map((k) => <Elemento key={k} indice={k} />)}
        <span>● ímpar</span>
        <span>●● par</span>
      </div>

      <div className="tools">
        <button type="button" className="btn" onClick={onExemplo}>Carregar exemplo</button>
        <button type="button" className="btn" onClick={onLimpar}>Limpar</button>
        {/* role="status": leitores de tela anunciam quando o texto muda */}
        <span className="status" role="status">
          {`${marcadas} de 16 linhas marcadas${ehExemplo ? ' · exemplo carregado' : ''}`}
        </span>
      </div>

      <div className="maes">
        {maes.map((linhas, i) => (
          <CartaoMae
            key={i}
            indice={i}
            linhas={linhas}
            onAlternar={onAlternar}
            onEscolher={onEscolher}
          />
        ))}
      </div>
    </Secao>
  );
}
