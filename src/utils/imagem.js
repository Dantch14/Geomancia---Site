// ============================================================
// utils/imagem.js
//
// Tudo para "Salvar imagem": transforma o bloco #captura num PNG.
// Usamos a biblioteca html2canvas, que "tira uma foto" de um pedaço da
// página. Ela tem limitações com SVG, então preparamos o terreno aqui
// (a borda do escudo vira um PNG pronto, e as cores dos SVGs são fixadas).
// ============================================================
import { ajustarEscudo, caminhoEscudo } from './escudo';

// A imagem sai sempre com esta largura, no celular ou no computador.
export const LARGURA_FOTO = 820;

// Mede como o escudo ficará NA FOTO (que tem largura e fontes próprias).
// Faz uma cópia do bloco, fora da tela, aplica o estilo da foto e roda o
// mesmo ajuste de encaixe. Devolve largura, altura e o espaço extra de baixo.
function medirEscudoFoto(alvo, largura) {
  const copia = alvo.cloneNode(true);
  // Remove ids da cópia para não duplicar ids na página.
  copia.querySelectorAll('[id]').forEach((e) => e.removeAttribute('id'));
  copia.removeAttribute('id');
  copia.classList.add('foto');
  Object.assign(copia.style, {
    position: 'fixed',
    left: '-10000px', // fora da tela
    top: '0',
    width: largura + 'px',
    visibility: 'hidden',
  });
  document.body.appendChild(copia);
  try {
    const esc = copia.querySelector('.escudo');
    ajustarEscudo(esc, 10); // folga maior na foto
    const g = esc.querySelector('.escudo-grade');
    return {
      w: esc.offsetWidth,
      h: esc.offsetHeight,
      pb: getComputedStyle(g).paddingBottom,
    };
  } finally {
    copia.remove(); // sempre limpa a cópia, mesmo se der erro
  }
}

// Desenha a borda do escudo num PNG, já com as cores resolvidas.
// (O html2canvas transforma <svg> em imagem sem o CSS da página, e a borda
// saía sem cor e com a altura errada. Por isso desenhamos aqui à mão.)
//   caminhoEl : o <path> da borda, de onde lemos as cores atuais (claro/escuro)
function bordaEscudoPNG(w, h, caminhoEl) {
  const k = 3; // resolução 3x para ficar nítido
  const cv = document.createElement('canvas');
  cv.width = Math.round(w * k);
  cv.height = Math.round(h * k);
  const ctx = cv.getContext('2d');
  ctx.scale(k, k);
  const cs = getComputedStyle(caminhoEl);
  const p = new Path2D(caminhoEscudo(w, h, 2));
  ctx.fillStyle = cs.fill;
  ctx.fill(p);
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.strokeStyle = cs.stroke;
  ctx.stroke(p);
  return cv.toDataURL('image/png');
}

// Gera o PNG (um "Blob") a partir do elemento #captura.
export async function gerarImagemDoEscudo(alvo) {
  // Espera as fontes carregarem, senão a foto sairia com a fonte errada.
  if (document.fonts && document.fonts.ready) await document.fonts.ready;

  // Import dinâmico: o html2canvas é pesado, então só é baixado quando
  // alguém realmente clica em "Salvar imagem" (site abre mais rápido).
  const { default: html2canvas } = await import('html2canvas');

  const bg = getComputedStyle(document.body).backgroundColor;
  const medida = medirEscudoFoto(alvo, LARGURA_FOTO);
  const bordaPNG = bordaEscudoPNG(
    medida.w,
    medida.h,
    alvo.querySelector('.escudo-borda path')
  );
  const dataHoje = new Date().toLocaleDateString('pt-BR');

  const canvas = await html2canvas(alvo, {
    backgroundColor: bg,
    scale: 3,
    useCORS: true,
    logging: false,
    windowWidth: 1100,
    windowHeight: 1600,
    scrollX: 0,
    scrollY: 0,
    // `onclone` roda numa CÓPIA da página. Podemos mexer nela à vontade
    // que a página real não muda.
    onclone: (doc) => {
      const c = doc.getElementById('captura');
      c.classList.add('foto');
      c.style.width = LARGURA_FOTO + 'px';

      const mapa = doc.getElementById('mapa');
      if (mapa) mapa.style.overflow = 'visible';

      // Rodapé da foto, com a data de hoje.
      const rodape = c.querySelector('.foto-rodape');
      if (rodape) rodape.textContent = 'Escudo Geomântico · ' + dataHoje;

      // SVGs viram imagem na captura e perdem o CSS da página:
      // copiamos as cores já calculadas para dentro dos próprios elementos.
      c.querySelectorAll('svg [class]').forEach((el) => {
        const cs = doc.defaultView.getComputedStyle(el);
        ['fill', 'stroke', 'stroke-width', 'stroke-dasharray'].forEach((p) => {
          const v = cs.getPropertyValue(p);
          if (v) el.setAttribute(p, v);
        });
      });

      // Troca o <svg> da borda pelo PNG pronto, no tamanho medido, e usa o
      // mesmo espaço abaixo da grade. Assim a foto bate com o que medimos.
      const sv = c.querySelector('.escudo-borda');
      const g = c.querySelector('.escudo-grade');
      if (sv && g) {
        g.style.paddingBottom = medida.pb;
        const img = doc.createElement('img');
        img.className = 'escudo-borda';
        img.alt = '';
        img.src = bordaPNG;
        sv.replaceWith(img);
      }
    },
  });

  const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
  if (!blob) throw new Error('sem imagem');
  return blob;
}

// Entrega o PNG ao usuário:
//  - no celular, abre o menu de compartilhar;
//  - no computador (ou se o celular não suportar), baixa o arquivo.
// Devolve 'compartilhado' | 'cancelado' | 'baixado'.
export async function entregarImagem(blob) {
  const arq = new File([blob], 'escudo-geomantico.png', { type: 'image/png' });

  const ehCelular = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (navigator.canShare && navigator.canShare({ files: [arq] }) && ehCelular) {
    try {
      await navigator.share({ files: [arq], title: 'Escudo geomântico' });
      return 'compartilhado';
    } catch (err) {
      // Se a pessoa só fechou o menu, não é erro: apenas cancelou.
      if (err && err.name === 'AbortError') return 'cancelado';
      // Qualquer outro erro: cai para o download normal logo abaixo.
    }
  }

  // Download clássico: cria um link invisível, clica nele e remove.
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'escudo-geomantico.png';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000); // libera a memória
  return 'baixado';
}
