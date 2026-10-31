// ============================================================
// dados/figuras.js
//
// Aqui fica o "cérebro" da geomancia: os DADOS das 16 figuras e as
// FUNÇÕES de cálculo. Nada neste arquivo é React: são funções comuns
// de JavaScript, que recebem dados e devolvem dados. Isso é bom porque
// dá para testar e reaproveitar sem depender de nenhuma tela.
// ============================================================

// Nomes das quatro linhas de cada figura, de cima para baixo.
export const ELEM = ['Ar', 'Fogo', 'Água', 'Terra'];

// Nome da classe/variável de cor de cada elemento (ver --ar, --fogo... no CSS).
export const CLASSE_ELEM = ['ar', 'fogo', 'agua', 'terra'];

// As 16 figuras.
//   nome  : nome em latim
//   pt    : tradução
//   l     : as 4 linhas. 1 = ímpar (um ponto), 2 = par (dois pontos)
//   comp  : composição elemental
//   cor   : cor da peça
//   desc  : significado
export const FIGURAS = [
  {nome:'Populus',pt:'o Povo',l:[2,2,2,2],comp:'Terra sobre Terra',cor:'#66CCCC',desc:'A matéria a ser trabalhada; a individualidade coletiva, o povo. Representa caos, desordem, aleatoriedade. Contém o maior número de pontos, evoca a ideia de multidão e todas as nuanças que esta possa conter, ou seja,  é uma massa difícil de mobilizar e igualmente difícil de controlar.'},
  {nome:'Via',pt:'o Caminho',l:[1,1,1,1],comp:'Fogo sobre Fogo',cor:'#9966FF',desc:'Movimento direcionado; mudança, jornada, transição e avanço. Possui a decisão, embora seja instável e possa inverter a situação. É a figura que contém o menor número de pontos pois evoca a ideia de uma busca solitária, de um esforço necessário para encontrar o caminho certo.'},
  {nome:'Laetitia',pt:'a Alegria',l:[1,2,2,2],comp:'Água sobre Terra',cor:'#CC99CC',desc:'O solo irrigado que permite a alimentação e o crescimento dos seres vivos, alegria. Elevação do ânimo e otimismo, boas notícias, sucesso, saúde e movimento para cima. Satisfação e prazeres da vida, beneficiência'},
  {nome:'Tristitia',pt:'a Tristeza',l:[2,2,2,1],comp:'Terra sobre Ar',cor:'#996600',desc:'Tristeza, melancolia, sofrimento, solidão, depressão, desânimo, perda de ânimo, desmotivação. Derrota; falta de confiança, imobilidade e passividade.'},
  {nome:'Caput Draconis',pt:'a Cabeça do Dragão',l:[2,1,1,1],comp:'Ar sobre Fogo',cor:'#990099',desc:'Algo que sobe, voltado para o céu, ascendente. Elevação metafísica e espiritual, desapego do material. Figura positiva que evoca a ideia de uma realização, é a vontade dirigida pela cabeça, isto é, a consciência. Lúcida e objetiva.'},
  {nome:'Cauda Draconis',pt:'a Cauda do Dragão',l:[1,1,1,2],comp:'Fogo sobre Água',cor:'#FFFF00',desc:'Algo que desce, voltado para baixo, para o escuro, descendente; materialismo, apego, decadência, término, a morte do espírito. Figura negativa; são os baixos instintos que orientam a ação, o que torna possível a falsidade e a mentira.'},
  {nome:'Rubeus',pt:'o Vermelho',l:[2,1,2,2],comp:'Ar sobre Terra',cor:'#CC0099',desc:'Movimento em busca de objetivos materiais, significa agitação, turbulência, estresse, força de vontade, impulso. Figura de luta, de combate e de violência. Destrói e causa a explosão de tudo, mas com o objetivo de renovar, de reconstruir.'},
  {nome:'Albus',pt:'o Branco',l:[2,2,1,2],comp:'Terra sobre Água',cor:'#669999',desc:'O controle das emoções; a experiência e o conhecimento, paz interior. É a figura da paz, pois acalma, unifica, regulariza; corresponde às aspirações mais nobres.'},
  {nome:'Puella',pt:'a Jovem',l:[1,2,1,1],comp:'Água sobre Fogo',cor:'#996699',desc:'A disposição dos pontos lembra o símbolo de Vênus e possui qualidades próximas das atribuídas a Libra. Representa harmonia, paz, feminilidade, gentileza, conciliação e delicadeza.'},
  {nome:'Puer',pt:'o Infante',l:[1,1,2,1],comp:'Fogo sobre Ar',cor:'#66CCCC',desc:'A disposição dos pontos lembra o símbolo de Marte. Possui qualidades próximas das atribuídas a Áries. Significa masculinidade, força, energia, impulso, ação, agressividade, conflito. É o adolescente cheio de vida, de energia e de paixão; é uma figura de independência, entusiasmo, rebeldia e coragem.'},
  {nome:'Fortuna Minor',pt:'a Fortuna Menor',l:[1,1,2,2],comp:'Fogo sobre Terra',cor:'#CCCCFF',desc:'O solo sendo queimado, ou preparado; a concretização parcial de objetivos. Algo positivo, mas não em totalidade; não é exatamente aquilo que se espera. Também pode representar sucesso inesperado, mas de curta duração; é a oportunidade a ser agarrada mas que pode rapidamente escapar.'},
  {nome:'Fortuna Major',pt:'a Fortuna Maior',l:[2,2,1,1],comp:'Terra sobre Fogo',cor:'#9999CC',desc:'A Figura mais benéfica entre todas; a mais privilegiadas; a concretização de objetivos. A argila sendo enrijecida pelo cozimento na forma desejada, indica algo positivo, completo, satisfatório, grande realização. É o sucesso no sentido de uma revelação; torna o ser receptivo em relação às boas influências, protege e satisfaz.'},
  {nome:'Amissio',pt:'a Perda',l:[1,2,1,2],comp:'Água sobre Água',cor:'#009966',desc:'Excesso de emoções, destempero, perdas, sacrífico. Figura de renúncia, é negativa e obriga à restrição em todos os planos.'},
  {nome:'Acquisitio',pt:'o Ganho',l:[2,1,2,1],comp:'Ar sobre Ar',cor:'#006633',desc:'É uma figura positiva que representa a aquisição e o ganho; o mérito, a posse, corresponde ao progresso, à melhora, principalmente em termos materiais.'},
  {nome:'Conjunctio',pt:'a Conjunção',l:[2,1,1,2],comp:'Ar sobre Água',cor:'#99CC66',desc:'A figura do entendimento, do acordo; simboliza as associações, os contatos, os reencontros e os interesses comuns. Unidade, coletividade, parceria e comunicação.'},
  {nome:'Carcer',pt:'a Prisão',l:[1,2,2,1],comp:'Água sobre Ar',cor:'#CCCC99',desc:'Aprisionamento; é uma figura negativa, que representa um bloqueio, uma parada, uma privação de liberdade e autonomia. Por analogia, tem também um sentido de proteção do que já foi adquirido: bloqueia, mas conserva. É algo limitante e simboliza problemas maiores do que a capacidade de resolvê-los. Impotência.'},
];

// Índice para achar uma figura rapidamente pelas suas linhas.
// Ex.: as linhas [1,1,1,1] viram a chave "1111", que aponta para a posição de "Via".
// Object.fromEntries monta um objeto a partir de pares [chave, valor].
export const POR_CHAVE = Object.fromEntries(
  FIGURAS.map((f, i) => [f.l.join(''), i])
);

// ------------------------------------------------------------
// FUNÇÕES DE CÁLCULO
// Convenção: 1 = ímpar (um ponto), 2 = par (dois pontos),
// null = linha que ainda não foi marcada.
// ------------------------------------------------------------

// Soma de DUAS linhas:
//   ímpar + par   = ímpar
//   ímpar + ímpar = par
//   par   + par   = par
// Se qualquer uma das duas ainda não foi marcada, o resultado é null.
export function soma(a, b) {
  if (a == null || b == null) return null;
  return a !== b ? 1 : 2;
}

// Soma de duas FIGURAS inteiras, linha por linha.
export const somaFig = (x, y) => x.map((v, i) => soma(v, y[i]));

// Descobre qual das 16 figuras corresponde às linhas `l`.
// Devolve o índice (0 a 15) ou -1 se alguma linha ainda estiver vazia.
export const indiceFig = (l) =>
  l.every((v) => v === 1 || v === 2) ? POR_CHAVE[l.join('')] : -1;

// Devolve o objeto da figura (ou null se as linhas estiverem incompletas).
export const figura = (l) => {
  const i = indiceFig(l);
  return i >= 0 ? FIGURAS[i] : null;
};

// Calcula o mapa inteiro a partir das 4 mães.
//   M  = mães        (a tiragem)
//   T  = tias        (cada tia junta UMA mesma linha das 4 mães)
//   F  = filhas      (mães somadas de duas em duas)
//   S  = sobrinhas   (tias somadas de duas em duas)
//   P  = passado     (filha 1 + filha 2)
//   FU = futuro      (sobrinha 1 + sobrinha 2)
//   J  = juiz        (passado + futuro)
//   C  = conselho    (filha 1 + passado)
export function calcular(maes) {
  const M = maes;
  const T = [0, 1, 2, 3].map((k) => M.map((m) => m[k]));
  const F = [somaFig(M[0], M[1]), somaFig(M[2], M[3])];
  const S = [somaFig(T[0], T[1]), somaFig(T[2], T[3])];
  const P = somaFig(F[0], F[1]);
  const FU = somaFig(S[0], S[1]);
  const J = somaFig(P, FU);
  const C = somaFig(F[0], P);
  return { M, T, F, S, P, FU, J, C };
}

// Transforma o resultado de `calcular` em "nós": objetos com tudo o que a
// tela precisa para desenhar cada casa do escudo.
//   id    : identificador único (usado como `key` do React)
//   rot   : rótulo para leitores de tela, ex.: "1ª mãe"
//   papel : rótulo curto mostrado na tela, ex.: "Mãe 1"
//   l     : as 4 linhas da figura
//   f     : de onde ela vem ("fórmula"), ex.: "Mãe 1 + Mãe 2"
//
// OBS.: o site original tinha uma opção "regra" (clássica/usuário), mas as duas
// escreviam exatamente o mesmo texto no Conselho. Por isso o parâmetro sumiu.
export function montarNos(r) {
  const mk = (id, rot, papel, l, f) => ({ id, rot, papel, l, f });
  return {
    M: r.M.map((l, i) => mk(`M${i}`, `${i + 1}ª mãe`, `Mãe ${i + 1}`, l, 'tiragem')),
    T: r.T.map((l, i) => mk(`T${i}`, `${i + 1}ª tia`, `Tia ${i + 1}`, l, `${ELEM[i]} das 4 mães`)),
    F: r.F.map((l, i) => mk(`F${i}`, `${i + 1}ª filha`, `Filha ${i + 1}`, l, i ? 'Mãe 3 + Mãe 4' : 'Mãe 1 + Mãe 2')),
    S: r.S.map((l, i) => mk(`S${i}`, `${i + 1}ª sobrinha`, `Sobrinha ${i + 1}`, l, i ? 'Tia 3 + Tia 4' : 'Tia 1 + Tia 2')),
    P: mk('P', 'Passado', 'Passado', r.P, 'Filha 1 + Filha 2'),
    FU: mk('FU', 'Futuro', 'Futuro', r.FU, 'Sobrinha 1 + Sobrinha 2'),
    J: mk('J', 'Juiz', 'Juiz', r.J, 'Passado + Futuro'),
    C: mk('C', 'Conselho', 'Conselho', r.C, 'Filha 1 + Passado'),
  };
}

// Junta todos os nós numa lista só (útil para o catálogo).
export const listaNos = (N) => Object.values(N).flat();
