// ============================================================
// components/Cabecalho.jsx
// O topo da página: título e texto de apresentação. Não recebe props e não
// tem estado: é só conteúdo fixo.
// ============================================================
export default function Cabecalho() {
  return (
    <header className="top">
      <div className="wrap">
        <p className="eyebrow">Geomancia · cálculo da tiragem</p>
        <h1>Mapa Geomântico</h1>
        <p className="lead">
          Jogue as pedras fora do site e informe aqui as quatro mães. Tias,
          filhas, sobrinhas, passado, futuro, juiz e conselho saem calculados
          na hora.
        </p>
      </div>
    </header>
  );
}
