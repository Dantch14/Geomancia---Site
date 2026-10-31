// ============================================================
// components/NotasMapa.jsx
// O texto explicativo abaixo do escudo (o que cada grupo significa).
// Conteúdo fixo: a lista fica FORA do componente para não ser recriada
// a cada redesenho.
// ============================================================
const NOTAS = [
  ['Mães', 'A tiragem física, nas quatro posições. Ficam à direita, da 1ª à 4ª, lidas da esquerda para a direita.'],
  ['Tias', 'Cada tia reúne uma mesma linha das quatro mães: Ar, Fogo, Água e Terra. Ficam à esquerda, da 1ª à 4ª.'],
  ['Filhas', 'Somas das mães, duas a duas.'],
  ['Sobrinhas', 'Somas das tias, duas a duas.'],
  ['Passado e Futuro', 'O passado (à direita) soma as filhas. O futuro (à esquerda) soma as sobrinhas.'],
  ['Juiz', 'Passado mais Futuro.'],
  ['Conselho', '1ª filha mais o Passado.'],
];

export default function NotasMapa() {
  return (
    <div className="escudo-notas">
      <p className="escudo-dica">
        No Escudo Geomântico, as mães e as filhas ficam à direita, e as tias e
        as sobrinhas à esquerda. Em cada grupo, a ordem vai da esquerda para a
        direita: 1ª, 2ª, 3ª e 4ª.
      </p>
      {/* <dl> é a lista de "termo → descrição" do HTML (dt = termo, dd = descrição). */}
      <dl>
        {NOTAS.map(([titulo, texto]) => (
          <div key={titulo}>
            <dt>{titulo}</dt>
            <dd>{texto}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
