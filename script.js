(function(){
'use strict';

// ==CORE==
const ELEM=['Ar','Fogo','Água','Terra'];
const FIGURAS=[
  {nome:'Populus',pt:'o Povo',l:[2,2,2,2],comp:'Terra sobre Terra',cor:'#66CCCC',desc:'A matéria a ser trabalhada; a individualidade coletiva, o povo. Representa caos, desordem, aleatoriedade. Contém o maior número de pontos, evoca a ideia de multidão e todas as nuanças que esta possa conter, ou seja,  é uma massa difícil de mobilizar e igualmente difícil de controlar.'},
  {nome:'Via',pt:'o Caminho',l:[1,1,1,1],comp:'Fogo sobre Fogo',cor:'#9966FF',desc:'Movimento direcionado; mudança, jornada, transição e avanço. Possui a decisão, embora seja instável e possa inverter a situação. É a figura que contém o menor número de pontos pois evoca a ideia de uma busca solitária, de um esforço necessário para encontrar o caminho certo.'},
  {nome:'Laetitia',pt:'a Alegria',l:[1,2,2,2],comp:'Água sobre Terra',cor:'#CC99CC',desc:'O solo irrigado que permite a alimentação e o crescimento dos seres vivos, alegria. Elevação do ânimo e otimismo, boas notícias, sucesso, saúde e movimento para cima. Satisfação e prazeres da vida, beneficiência'},
  {nome:'Tristitia',pt:'a Tristeza',l:[2,2,2,1],comp:'Terra sobre Ar',cor:'#996600',desc:'Tristeza, melancolia, sofrimento, solidão, depressão, desânimo, perda de ânimo, desmotivação. Derrota; falta de confiança, imobilidade e passividade.'}
  {nome:'Caput Draconis',pt:'a Cabeça do Dragão',l:[2,1,1,1],comp:'Ar sobre Fogo',cor:'#990099',desc:'Algo que sobe, voltado para o céu, ascendente. Elevação metafísica e espiritual, desapego do material. Figura positiva que evoca a ideia de uma realização, é a vontade dirigida pela cabeça, isto é, a consciência. Lúcida e objetiva.'},
  {nome:'Cauda Draconis',pt:'a Cauda do Dragão',l:[1,1,1,2],comp:'Fogo sobre Água',cor:'#FFFF00',desc:'Algo que desce, voltado para baixo, para o escuro, descendente; materialismo, apego, decadência, término, a morte do espírito. Figura negativa; são os baixos instintos que orientam a ação, o que torna possível a falsidade e a mentira.'},
  {nome:'Rubeus',pt:'o Vermelho',l:[2,1,2,2],comp:'Ar sobre Terra',cor:'#CC0099',desc:'Movimento em busca de objetivos materiais, significa agitação, turbulência, estresse, força de vontade, impulso. Figura de luta, de combate e de violência. Destrói e causa a explosão de tudo, mas com o objetivo de renovar, de reconstruir.'},
  {nome:'Albus',pt:'o Branco',l:[2,2,1,2],comp:'Terra sobre Água',cor:'#669999',desc:'O controle das emoções; a experiência e o conhecimento, paz interior. É a figura da paz, pois acalma, unifica, regulariza; corresponde às aspirações mais nobres.'},
  {nome:'Puella',pt:'a Jovem',l:[1,2,1,1],comp:'Água sobre Fogo',cor:'#996699',desc:'A disposição dos pontos lembra o símbolo de Vênus e possui qualidades próximas das atribuídas a Libra. Representa harmonia, paz, feminilidade, gentileza, conciliação e delicadeza.'},
  {nome:'Puer',pt:'o Infante',l:[1,1,2,1],comp:'Fogo sobre Ar',cor:'#66CCCC',desc:'A disposição dos pontos lembra o símbolo de Marte. Possui qualidades próximas das atribuídas a Áries. Significa masculinidade, força, energia, impulso, ação, agressividade, conflito. É o adolescente cheio de vida, de energia e de paixão; é uma figura de independência, entusiasmo, até de rebelião.'},
  {nome:'Fortuna Minor',pt:'a Fortuna Menor',l:[1,1,2,2],comp:'Fogo sobre Terra',cor:'#CCCCFF',desc:'O solo sendo queimado, ou preparado; a concretização parcial de objetivos. Algo positivo, mas não em totalidade; não é exatamente aquilo que se espera. Também pode representar sucesso inesperado, mas de curta duração; é a oportunidade a ser agarrada mas que pode rapidamente escapar.'},
  {nome:'Fortuna Major',pt:'a Fortuna Maior',l:[2,2,1,1],comp:'Terra sobre Fogo',cor:'#9999CC',desc:'A Figura mais benéfica entre todas; a mais privilegiadas; a concretização de objetivos. A argila sendo enrijecida pelo cozimento na forma desejada, indica algo positivo, completo, satisfatório, grande realização. É o sucesso no sentido de uma revelação; torna o ser receptivo em relação às boas influências, protege e satisfaz.'},
  {nome:'Amissio',pt:'a Perda',l:[1,2,1,2],comp:'Água sobre Água',cor:'#009966',desc:'Excesso de emoções, destempero, perdas, sacrífico. Figura de renúncia, é negativa e obriga à restrição em todos os planos.'},
  {nome:'Acquisitio',pt:'o Ganho',l:[2,1,2,1],comp:'Ar sobre Ar',cor:'#006633',desc:'É uma figura positiva que representa a aquisição e o ganho; o mérito, a posse, corresponde ao progresso, à melhora, principalmente em termos materiais.'},
  {nome:'Conjunctio',pt:'a Conjunção',l:[2,1,1,2],comp:'Ar sobre Água',cor:'#99CC66',desc:'A figura do entendimento, do acordo; simboliza as associações, os contatos, os reencontros e os interesses comuns. Unidade, coletividade, parceria e comunicação.'},
  {nome:'Carcer',pt:'a Prisão',l:[1,2,2,1],comp:'Água sobre Ar',cor:'#CCCC99',desc:'Aprisionamento; é uma figura negativa, que representa um bloqueio, uma parada, uma privação de liberdade e autonomia. Por analogia, tem também um sentido de proteção do que já foi adquirido: bloqueia, mas conserva. É algo limitante e simboliza problemas maiores do que a capacidade de resolvê-los. Impotência.'},
];
const POR_CHAVE={};
FIGURAS.forEach((f,i)=>{POR_CHAVE[f.l.join('')]=i;});
// 1 = ímpar (um ponto), 2 = par (dois pontos), null = linha ainda não marcada
function soma(a,b){return (a==null||b==null)?null:(a!==b?1:2);}
function somaFig(x,y){return x.map((v,i)=>soma(v,y[i]));}
function indiceFig(l){return l.every(v=>v===1||v===2)?POR_CHAVE[l.join('')]:-1;}
function calcular(maes,regra){
  const M=maes;
  const T=[0,1,2,3].map(k=>M.map(m=>m[k]));
  const F=[somaFig(M[0],M[1]),somaFig(M[2],M[3])];
  const S=[somaFig(T[0],T[1]),somaFig(T[2],T[3])];
  const P=somaFig(F[0],F[1]);
  const FU=somaFig(S[0],S[1]);
  const J=somaFig(P,FU);
  const C=somaFig(F[0],P);
  return {M,T,F,S,P,FU,J,C};
}
// ==/CORE==

const CLS=['ar','fogo','agua','terra'];
const EXEMPLO=[[1,2,1,1],[1,1,2,1],[2,1,1,1],[1,2,1,1]];
const CHAVE='mapa-geomantico:v1';
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const UM='<svg viewBox="0 0 30 12" aria-hidden="true"><circle cx="15" cy="6" r="4.2" fill="currentColor"/></svg>';
const DOIS='<svg viewBox="0 0 30 12" aria-hidden="true"><circle cx="9" cy="6" r="4.2" fill="currentColor"/><circle cx="21" cy="6" r="4.2" fill="currentColor"/></svg>';

let estado={maes:EXEMPLO.map(l=>l.slice()),regra:'usuario',pergunta:''};
let REG={};
let ultimoFoco=null;

function carregar(){
  try{
    const bruto=localStorage.getItem(CHAVE);
    if(!bruto) return;
    const d=JSON.parse(bruto);
    const ok=Array.isArray(d.maes)&&d.maes.length===4&&d.maes.every(l=>Array.isArray(l)&&l.length===4&&l.every(v=>v===1||v===2||v===null));
    if(ok){estado.maes=d.maes;}
    if(d.regra==='classica'||d.regra==='usuario'){estado.regra=d.regra;}
    if(typeof d.pergunta==='string'){estado.pergunta=d.pergunta.slice(0,300);}
  }catch(_){}
}
function salvar(){
  try{localStorage.setItem(CHAVE,JSON.stringify(estado));}catch(_){}
}

function figura(l){const i=indiceFig(l);return i>=0?FIGURAS[i]:null;}

function tile(l){
  const f=figura(l);
  let s='<svg class="tile" viewBox="0 0 64 88" aria-hidden="true" focusable="false">';
  s+=f?`<rect x="1" y="1" width="62" height="86" rx="5" fill="${f.cor}" stroke="#1B2050" stroke-opacity=".45" stroke-width="2"/>`:'<rect class="tile-vazio" width="64" height="88" rx="5"/>';
  l.forEach((v,r)=>{
    const y=16+r*20;
    if(v===1){s+=`<circle class="dot" cx="32" cy="${y}" r="8"/>`;}
    else if(v===2){s+=`<circle class="dot" cx="18" cy="${y}" r="8"/><circle class="dot" cx="46" cy="${y}" r="8"/>`;}
    else{s+=`<circle class="dot-vazio" cx="32" cy="${y}" r="4.5"/>`;}
  });
  return s+'</svg>';
}

/* mães: montagem única, depois só sincroniza */
function montarMaes(){
  $('#maes').innerHTML=[0,1,2,3].map(i=>`
    <article class="mae" data-m="${i}" aria-labelledby="mae-t-${i}">
      <div class="mae-head">
        <div>
          <div class="mae-rot" id="mae-t-${i}">${i+1}ª mãe</div>
          <div class="mae-nome" data-nome>—</div>
          <div class="mae-pt" data-pt></div>
        </div>
        <div data-tile></div>
      </div>
      <select id="sel-${i}" aria-label="Escolher a figura da ${i+1}ª mãe">
        <option value="">Escolher figura…</option>
        ${FIGURAS.map((f,k)=>`<option value="${k}">${f.nome} · ${f.pt}</option>`).join('')}
      </select>
      <div class="linhas" role="group" aria-label="Linhas da ${i+1}ª mãe">
        ${ELEM.map((e,k)=>`
          <div class="linha">
            <span class="el" style="--c:var(--${CLS[k]})">${e}</span>
            <button type="button" class="opt" data-m="${i}" data-k="${k}" data-v="1" aria-pressed="false" aria-label="${e}: ímpar, um ponto">${UM}</button>
            <button type="button" class="opt" data-m="${i}" data-k="${k}" data-v="2" aria-pressed="false" aria-label="${e}: par, dois pontos">${DOIS}</button>
          </div>`).join('')}
      </div>
    </article>`).join('');
}
function syncMaes(){
  $$('.mae').forEach(card=>{
    const i=+card.dataset.m,l=estado.maes[i],f=figura(l);
    $('[data-nome]',card).textContent=f?f.nome:'—';
    $('[data-pt]',card).textContent=f?f.pt:(l.some(v=>v)?'faltam linhas':'marque as linhas');
    $('[data-tile]',card).innerHTML=tile(l);
    $('select',card).value=f?String(indiceFig(l)):'';
    $$('.opt',card).forEach(b=>b.setAttribute('aria-pressed',String(l[+b.dataset.k]===+b.dataset.v)));
  });
}

/* nós do mapa */
function nos(r){
  let c=0;
  const mk=(rot,papel,l,f)=>({id:'n'+(c++),rot,papel,l,f});
  const N={
    M:r.M.map((l,i)=>mk(`${i+1}ª mãe`,`Mãe ${i+1}`,l,'tiragem')),
    T:r.T.map((l,i)=>mk(`${i+1}ª tia`,`Tia ${i+1}`,l,`${ELEM[i]} das 4 mães`)),
    F:r.F.map((l,i)=>mk(`${i+1}ª filha`,`Filha ${i+1}`,l,i?'Mãe 3 + Mãe 4':'Mãe 1 + Mãe 2')),
    S:r.S.map((l,i)=>mk(`${i+1}ª sobrinha`,`Sobrinha ${i+1}`,l,i?'Tia 3 + Tia 4':'Tia 1 + Tia 2')),
    P:mk('Passado','Passado',r.P,'Filha 1 + Filha 2'),
    FU:mk('Futuro','Futuro',r.FU,'Sobrinha 1 + Sobrinha 2'),
    J:mk('Juiz','Juiz',r.J,'Passado + Futuro'),
    C:mk('Conselho','Conselho',r.C,estado.regra==='classica'?'Filha 1 + Passado':'Filha 1 + Passado')
  };
  REG={};
  Object.values(N).flat().forEach(n=>{REG[n.id]=n;});
  return N;
}

function renderLeitura(N){
  const itens=[N.P,N.FU,N.J,N.C];
  $('#leitura').innerHTML=itens.map(n=>{
    const f=figura(n.l);
    return `<article class="res ${n.papel==='Juiz'?'juiz':''}">
      <div class="res-rot">${n.papel}</div>
      <div class="res-top">${tile(n.l)}<div><div class="res-nome">${f?f.nome:'—'}</div><div class="res-pt">${f?f.pt:'aguardando as mães'}</div></div></div>
      ${f?`<div class="res-comp">${f.comp}</div><p>${f.desc}</p>`:''}
      <div class="res-f">${n.f}</div>
    </article>`;
  }).join('');
}

function celula(n,linha,col){
  const f=figura(n.l);
  const cls='cell'+(n.papel==='Juiz'?' juiz':'')+(n.papel==='Conselho'?' conselho':'');
  return `<button type="button" class="${cls}" style="grid-row:${linha};grid-column:${col} / span 2" data-open="${n.id}" ${f?'':'disabled'} aria-label="${n.rot}: ${f?f.nome:'ainda sem figura'}">
    <span class="cell-rot">${n.papel}</span>
    ${tile(n.l)}
    <span class="cell-nome">${f?f.nome:'—'}</span>
    <span class="cell-f">${n.f}</span>
  </button>`;
}
/* Escudo Geomântico em grade de 16 colunas (cada casa ocupa 2).
   Direita: mães e, abaixo, as filhas. Esquerda: tias e, abaixo, as sobrinhas.
   Cada grupo é lido da esquerda para a direita (1ª, 2ª, 3ª, 4ª).
   Depois: Futuro (esquerda) e Passado (direita), Juiz e, na ponta, o Conselho. */
function renderMapa(N){
  const pos=[
    [N.T[0],1,1],[N.T[1],1,3],[N.T[2],1,5],[N.T[3],1,7],
    [N.M[0],1,9],[N.M[1],1,11],[N.M[2],1,13],[N.M[3],1,15],
    [N.S[0],2,2],[N.S[1],2,6],
    [N.F[0],2,10],[N.F[1],2,14],
    [N.FU,3,4],[N.P,3,12],
    [N.J,4,8],
    [N.C,5,8]
  ];
  const cel=pos.map(([n,r,c])=>celula(n,r,c)).join('');
  $('#mapa').innerHTML=`<div class="escudo"><svg class="escudo-borda" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 0H100V50C100 78 74 90 50 100C26 90 0 78 0 50Z"/></svg><div class="escudo-grade">${cel}</div></div>`;
  const notas=[
    ['Mães','A tiragem física, nas quatro posições. Ficam à direita, da 1ª à 4ª, lidas da esquerda para a direita.'],
    ['Tias','Cada tia reúne uma mesma linha das quatro mães: Ar, Fogo, Água e Terra. Ficam à esquerda, da 1ª à 4ª.'],
    ['Filhas','Somas das mães, duas a duas.'],
    ['Sobrinhas','Somas das tias, duas a duas.'],
    ['Passado e Futuro','O passado (à direita) soma as filhas. O futuro (à esquerda) soma as sobrinhas.'],
    ['Juiz','Passado mais Futuro.'],
    ['Conselho','1ª filha mais o Passado.']
  ];
  $('#mapa-notas').innerHTML='<p class="escudo-dica">No Escudo Geomântico, as mães e as filhas ficam à direita, e as tias e as sobrinhas à esquerda. Em cada grupo, a ordem vai da esquerda para a direita: 1ª, 2ª, 3ª e 4ª.</p><dl>'+notas.map(([t,x])=>`<div><dt>${t}</dt><dd>${x}</dd></div>`).join('')+'</dl>';
}

function renderRegra(){
  $$('[data-regra]').forEach(b=>b.setAttribute('aria-checked',String(b.dataset.regra===estado.regra)));
  $('#regra-nota').textContent=estado.regra==='classica'
    ?'O conselho é formado pela primeira filha com o passado.'
    :'O juiz é formado pelo passado com o futuro.';
}

function renderCatalogo(N){
  const pap={};
  Object.values(N).flat().forEach(n=>{
    const i=indiceFig(n.l);
    if(i>=0){(pap[i]=pap[i]||[]).push(n.papel);}
  });
  $('#catalogo').innerHTML=FIGURAS.map((f,i)=>{
    const p=pap[i]||[];
    return `<article class="fig ${p.length?'ativa':''}" data-busca="${norm(f.nome+' '+f.pt+' '+f.comp)}">
      ${tile(f.l)}
      <div>
        <h3>${f.nome}</h3>
        <div class="pt">${f.pt}</div>
        <div class="comp">${f.comp}</div>
        <p>${f.desc}</p>
        ${p.length?`<div class="chips">${p.map(x=>`<span class="chip">${x}</span>`).join('')}</div>`:''}
      </div>
    </article>`;
  }).join('');
  filtrar();
}
function filtrar(){
  const q=norm($('#busca').value.trim());
  let n=0;
  $$('#catalogo .fig').forEach(el=>{
    const mostra=!q||el.dataset.busca.includes(q);
    el.hidden=!mostra;
    if(mostra){n++;}
  });
  $('#cat-vazio').hidden=n>0;
}

function renderPergunta(){
  const q=estado.pergunta.trim();
  $('#mapa-pergunta').hidden=!q;
  $('#mapa-pergunta-txt').textContent=q;
  $('#pergunta-cont').textContent=`${estado.pergunta.length} / 300`;
}

async function salvarImagem(){
  const btn=$('#btn-foto'),av=$('#aviso-img');
  const aviso=t=>{av.textContent=t;setTimeout(()=>{av.textContent='';},2600);};
  if(typeof html2canvas!=='function'){aviso('Biblioteca de imagem não carregou');return;}
  btn.disabled=true;av.textContent='Gerando…';
  try{
    if(document.fonts&&document.fonts.ready){await document.fonts.ready;}
    $('#foto-rodape').textContent='Escudo Geomântico · '+new Date().toLocaleDateString('pt-BR');
    const alvo=$('#captura');
    const bg=getComputedStyle(document.body).backgroundColor;
    /* a imagem sai sempre com a mesma largura e proporção, no celular ou no computador */
    const LARGURA=820;
    const canvas=await html2canvas(alvo,{
      backgroundColor:bg,scale:3,useCORS:true,logging:false,
      windowWidth:1100,windowHeight:1600,scrollX:0,scrollY:0,
      onclone:doc=>{
        const c=doc.getElementById('captura');
        c.classList.add('foto');
        c.style.width=LARGURA+'px';
        const mapa=doc.getElementById('mapa');
        if(mapa){mapa.style.overflow='visible';}
        /* SVGs viram imagem na captura e perdem o CSS da página: resolve as cores para valores fixos */
        c.querySelectorAll('svg [class]').forEach(el=>{
          const cs=doc.defaultView.getComputedStyle(el);
          ['fill','stroke','stroke-width','stroke-dasharray'].forEach(p=>{
            const v=cs.getPropertyValue(p);
            if(v){el.setAttribute(p,v);}
          });
        });
        /* borda do escudo em pixels reais, sem esticar o desenho */
        const esc=c.querySelector('.escudo'),sv=c.querySelector('.escudo-borda');
        if(esc&&sv){
          const w=esc.offsetWidth,h=esc.offsetHeight,m=2;
          sv.setAttribute('viewBox','0 0 '+w+' '+h);
          sv.setAttribute('preserveAspectRatio','none');
          const p=sv.querySelector('path');
          p.setAttribute('d',`M${m} ${m}H${w-m}V${h*.5}C${w-m} ${h*.78} ${w*.74} ${h*.9} ${w/2} ${h-m}C${w*.26} ${h*.9} ${m} ${h*.78} ${m} ${h*.5}Z`);
          p.setAttribute('stroke-width','2.5');
          p.removeAttribute('vector-effect');
        }
      }
    });
    const blob=await new Promise(res=>canvas.toBlob(res,'image/png'));
    if(!blob) throw new Error('sem imagem');
    const arq=new File([blob],'escudo-geomantico.png',{type:'image/png'});
    if(navigator.canShare&&navigator.canShare({files:[arq]})&&/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)){
      try{await navigator.share({files:[arq],title:'Escudo geomântico'});aviso('Imagem pronta');return;}
      catch(err){if(err&&err.name==='AbortError'){av.textContent='';return;}}
    }
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;a.download='escudo-geomantico.png';
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    aviso('Imagem salva');
  }catch(_){
    aviso('Não foi possível gerar a imagem');
  }finally{
    btn.disabled=false;
  }
}

function textoLeitura(N){
  const nm=n=>{const f=figura(n.l);return f?f.nome:'—';};
  const q=estado.pergunta.trim();
  return [
    'Mapa geomântico',
    ...(q?['Pergunta: '+q]:[]),
    'Mães: '+N.M.map(nm).join(', '),
    'Tias: '+N.T.map(nm).join(', '),
    'Filhas: '+N.F.map(nm).join(', '),
    'Sobrinhas: '+N.S.map(nm).join(', '),
    'Passado: '+nm(N.P),
    'Futuro: '+nm(N.FU),
    'Juiz: '+nm(N.J),
    'Conselho: '+nm(N.C)+' ('+N.C.f+')'
  ].join('\n');
}
async function copiar(txt){
  try{await navigator.clipboard.writeText(txt);return true;}catch(_){}
  try{
    const ta=document.createElement('textarea');
    ta.value=txt;ta.style.position='fixed';ta.style.opacity='0';
    document.body.appendChild(ta);ta.select();
    const ok=document.execCommand('copy');
    ta.remove();
    return ok;
  }catch(_){return false;}
}

/* painel de significado */
function abrir(id,origem){
  const n=REG[id],f=n&&figura(n.l);
  if(!f) return;
  ultimoFoco=origem||null;
  $('#sheet-conteudo').innerHTML=`
    <div class="sh-top">
      ${tile(n.l)}
      <div>
        <div class="sh-rot">${n.papel} · ${n.f}</div>
        <h3 id="sheet-title">${f.nome}</h3>
        <div class="sh-pt">${f.pt}</div>
        <div class="sh-comp">${f.comp}</div>
      </div>
    </div>
    <p class="sh-desc">${f.desc}</p>
    <ul class="sh-linhas">
      ${ELEM.map((e,k)=>`<li><span class="el" style="--c:var(--${CLS[k]})">${e}</span><span>${n.l[k]===1?'ímpar':'par'}</span><span class="sh-pts">${n.l[k]===1?'●':'●●'}</span></li>`).join('')}
    </ul>`;
  $('#sheet').hidden=false;
  $('.sheet-x').focus();
}
function fechar(){
  $('#sheet').hidden=true;
  if(ultimoFoco&&document.contains(ultimoFoco)){ultimoFoco.focus();}
  ultimoFoco=null;
}

/* ciclo principal */
function render(){
  const r=calcular(estado.maes,estado.regra);
  const N=nos(r);
  renderRegra();
  renderPergunta();
  renderLeitura(N);
  renderMapa(N);
  renderCatalogo(N);
  const marcadas=estado.maes.flat().filter(Boolean).length;
  const ehExemplo=JSON.stringify(estado.maes)===JSON.stringify(EXEMPLO);
  $('#status').textContent=`${marcadas} de 16 linhas marcadas`+(ehExemplo?' · exemplo carregado':'');
  $('#btn-copiar').disabled=!estado.maes.every(l=>indiceFig(l)>=0);
  $('#btn-copiar').dataset.texto=textoLeitura(N);
}
function mudou(){
  salvar();
  syncMaes();
  render();
}

document.addEventListener('click',async e=>{
  const t=e.target;
  const opt=t.closest('.opt');
  if(opt){
    const m=+opt.dataset.m,k=+opt.dataset.k,v=+opt.dataset.v;
    estado.maes[m][k]=estado.maes[m][k]===v?null:v;
    mudou();
    return;
  }
  const rg=t.closest('[data-regra]');
  if(rg){estado.regra=rg.dataset.regra;mudou();return;}
  const op=t.closest('[data-open]');
  if(op&&!op.disabled){abrir(op.dataset.open,op);return;}
  if(t.closest('[data-close]')){fechar();return;}
  if(t.closest('#btn-exemplo')){estado.maes=EXEMPLO.map(l=>l.slice());mudou();return;}
  if(t.closest('#btn-limpar')){estado.maes=[0,1,2,3].map(()=>[null,null,null,null]);mudou();return;}
  if(t.closest('#btn-foto')){
    if(!$('#btn-foto').disabled){salvarImagem();}
    return;
  }
  if(t.closest('#btn-copiar')){
    const btn=$('#btn-copiar');
    if(btn.disabled) return;
    const ok=await copiar(btn.dataset.texto||'');
    const av=$('#aviso');
    av.textContent=ok?'Copiado':'Não foi possível copiar';
    setTimeout(()=>{av.textContent='';},2200);
  }
});
document.addEventListener('change',e=>{
  const sel=e.target.closest('.mae select');
  if(!sel||sel.value==='') return;
  const i=+sel.closest('.mae').dataset.m;
  estado.maes[i]=FIGURAS[+sel.value].l.slice();
  mudou();
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&!$('#sheet').hidden){fechar();}
});
$('#busca').addEventListener('input',filtrar);
$('#pergunta').addEventListener('input',e=>{
  estado.pergunta=e.target.value;
  salvar();
  renderPergunta();
  $('#btn-copiar').dataset.texto=textoLeitura(nos(calcular(estado.maes,estado.regra)));
});

montarMaes();
carregar();
$('#pergunta').value=estado.pergunta;
syncMaes();
render();
})();
