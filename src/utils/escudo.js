// ============================================================
// utils/escudo.js
//
// A parte que garante que NENHUMA casa (nem símbolo) saia do contorno
// do escudo. O contorno é uma forma curva, mais estreita na ponta, onde
// fica o Conselho. Então, depois de desenhar, medimos se todos os cantos
// de todas as casas estão DENTRO da forma. Se algum estiver fora,
// aumentamos o espaço abaixo da grade: o escudo cresce e a ponta desce,
// repetindo até tudo caber.
// ============================================================

// Contorno do escudo, escrito como "caminho SVG". Uma única definição,
// usada na tela, no teste de encaixe e na imagem salva.
//   w, h : largura e altura do escudo, em pixels
//   m    : margem, para o traço da borda não ser cortado
export function caminhoEscudo(w, h, m = 0) {
  return `M${m} ${m}H${w - m}V${h * 0.5}C${w - m} ${h * 0.78} ${w * 0.74} ${h * 0.9} ${w / 2} ${h - m}C${w * 0.26} ${h * 0.9} ${m} ${h * 0.78} ${m} ${h * 0.5}Z`;
}

// Um "canvas" invisível só para usar o teste isPointInPath ("este ponto está
// dentro da forma?"). Criado uma única vez e reaproveitado: criar um novo a
// cada teste seria desperdício.
let ctxTeste = null;
const obterCtx = () =>
  ctxTeste || (ctxTeste = document.createElement('canvas').getContext('2d'));

// Confere se os quatro cantos de cada casa (com `folga` pixels de respiro)
// estão dentro do contorno. Devolve true se TUDO cabe.
function cabeNoEscudo(esc, folga) {
  const w = esc.offsetWidth;
  const h = esc.offsetHeight;
  const e = esc.getBoundingClientRect();
  const ctx = obterCtx();
  const forma = new Path2D(caminhoEscudo(w, h, 0));

  return Array.from(esc.querySelectorAll('.cell')).every((c) => {
    const r = c.getBoundingClientRect();
    // Cantos da casa, medidos a partir do canto do escudo e com a folga.
    const x0 = r.left - e.left - folga;
    const x1 = r.right - e.left + folga;
    const y0 = r.top - e.top - folga;
    const y1 = r.bottom - e.top + folga;
    return [[x0, y0], [x1, y0], [x0, y1], [x1, y1]].every(([x, y]) =>
      ctx.isPointInPath(forma, x, y)
    );
  });
}

// Ajusta o escudo até tudo caber.
//   esc   : o elemento .escudo (do DOM, não do React)
//   folga : respiro mínimo, em pixels, entre a casa e a borda
//
// Aqui mexemos direto no DOM (style.paddingBottom) de propósito: o resultado
// depende de MEDIR a tela já desenhada, e o React só nos dá essa medida
// depois que ele desenhou. Por isso este código roda em useLayoutEffect
// (ver components/Escudo.jsx).
export function ajustarEscudo(esc, folga = 8) {
  const g = esc && esc.querySelector('.escudo-grade');
  if (!g) return;
  g.style.paddingBottom = ''; // volta ao padding do CSS antes de medir
  // Limite de 80 tentativas, 8px por vez, para nunca travar em laço infinito.
  for (let i = 0; i < 80 && !cabeNoEscudo(esc, folga); i++) {
    g.style.paddingBottom =
      parseFloat(getComputedStyle(g).paddingBottom) + 8 + 'px';
  }
}
