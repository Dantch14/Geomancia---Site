// ============================================================
// components/PontosOpcao.jsx
// O desenho pequeno dos botões "ímpar" (1 ponto) e "par" (2 pontos).
// Usa currentColor: o ponto herda a cor do texto do botão, então muda
// sozinho quando o botão é marcado ou no modo escuro.
// ============================================================

// Props:
//   quantidade : 1 (ímpar) ou 2 (par)
export default function PontosOpcao({ quantidade }) {
  return (
    <svg viewBox="0 0 30 12" aria-hidden="true">
      {quantidade === 1 ? (
        <circle cx="15" cy="6" r="4.2" fill="currentColor" />
      ) : (
        <>
          <circle cx="9" cy="6" r="4.2" fill="currentColor" />
          <circle cx="21" cy="6" r="4.2" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
