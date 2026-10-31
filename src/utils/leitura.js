// ============================================================
// utils/leitura.js
//
// Funções de texto: o resumo copiado pelo botão "Copiar leitura" e
// a função que tira acentos para a busca do catálogo.
// ============================================================
import { figura } from '../dados/figuras';

// Tira acentos e deixa tudo minúsculo: "Água" vira "agua".
// Assim a busca encontra a figura mesmo se a pessoa digitar sem acento.
// (̀-ͯ é a faixa Unicode dos acentos soltos, que o normalize('NFD')
// separa das letras.)
export const normalizar = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Monta o texto da leitura, uma informação por linha.
//   N        : os nós do mapa (ver montarNos)
//   pergunta : a pergunta digitada (pode estar vazia)
export function textoLeitura(N, pergunta) {
  // Nome da figura de um nó, ou "—" se ainda estiver incompleta.
  const nm = (n) => {
    const f = figura(n.l);
    return f ? f.nome : '—';
  };
  const q = pergunta.trim();
  return [
    'Mapa geomântico',
    ...(q ? ['Pergunta: ' + q] : []), // só entra se houver pergunta
    'Mães: ' + N.M.map(nm).join(', '),
    'Tias: ' + N.T.map(nm).join(', '),
    'Filhas: ' + N.F.map(nm).join(', '),
    'Sobrinhas: ' + N.S.map(nm).join(', '),
    'Passado: ' + nm(N.P),
    'Futuro: ' + nm(N.FU),
    'Juiz: ' + nm(N.J),
    'Conselho: ' + nm(N.C) + ' (' + N.C.f + ')',
  ].join('\n');
}

// Copia texto para a área de transferência. Devolve true se deu certo.
export async function copiarTexto(txt) {
  // Jeito moderno.
  try {
    await navigator.clipboard.writeText(txt);
    return true;
  } catch (_) {
    /* segue para o plano B */
  }
  // Plano B para navegadores antigos: cria um <textarea> escondido,
  // seleciona o texto e usa o comando de copiar.
  try {
    const ta = document.createElement('textarea');
    ta.value = txt;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch (_) {
    return false;
  }
}
