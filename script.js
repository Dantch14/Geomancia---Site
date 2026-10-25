(function(){
'use strict';

// ==CORE==
const ELEM=['Ar','Fogo','Água','Terra'];
const FIGURAS=[
  {nome:'Populus',pt:'o Povo',l:[2,2,2,2],comp:'Terra sobre Terra',cor:'#66CCCC',desc:'A matéria a ser trabalhada. A individualidade coletiva. O povo. Representa caos, desordem, aleatoriedade'},
  {nome:'Via',pt:'o Caminho',l:[1,1,1,1],comp:'Fogo sobre Fogo',cor:'#9966FF',desc:'Movimento direcionado; mudança, jornada, transição e avanço. Possui a decisão, embora seja instável e possa inverter a situação.'},
  {nome:'Laetitia',pt:'a Alegria',l:[1,2,2,2],comp:'Água sobre Terra',cor:'#CC99CC',desc:'Elementos complementares. O solo irrigado que permite a alimentação e o crescimento dos seres vivos. Elevação do ânimo, boas notícias, sucesso, saúde e movimento para cima.'},
  {nome:'Caput Draconis',pt:'a Cabeça do Dragão',l:[2,1,1,1],comp:'Ar sobre Fogo',cor:'#990099',desc:'Algo que sobe, voltado para o céu, ascendente. Elevação metafísica e espiritual, desapego do material.'},
  {nome:'Rubeus',pt:'o Vermelho',l:[2,1,2,2],comp:'Ar sobre Terra',cor:'#CC0099',desc:'Movimento em busca de objetivos materiais. Agitação. Turbulência, estresse, força de vontade, impulso.'},
  {nome:'Puella',pt:'a Jovem',l:[1,2,1,1],comp:'Água sobre Fogo',cor:'#996699',desc:'A disposição dos pontos lembra o símbolo de Vênus. Possui qualidades próximas das atribuídas a Libra. Representa harmonia, paz, feminilidade.'},
  {nome:'Fortuna Minor',pt:'a Fortuna Menor',l:[1,1,2,2],comp:'Fogo sobre Terra',cor:'#CCCCFF',desc:'O solo sendo queimado, ou preparado. A concretização parcial de objetivos. Algo positivo, mas não em totalidade; não é exatamente aquilo que se espera.'},
  {nome:'Fortuna Major',pt:'a Fortuna Maior',l:[2,2,1,1],comp:'Terra sobre Fogo',cor:'#9999CC',desc:'A concretização de objetivos. A argila sendo enrijecida pelo cozimento na forma desejada. Algo positivo, completo, satisfatório, grande realização.'},
  {nome:'Albus',pt:'o Branco',l:[2,2,1,2],comp:'Terra sobre Água',cor:'#669999',desc:'A água no subsolo. O controle das emoções. A experiência e o conhecimento. Paz interior.'},
  {nome:'Puer',pt:'o Infante',l:[1,1,2,1],comp:'Fogo sobre Ar',cor:'#66CCCC',desc:'A disposição dos pontos lembra o símbolo de Marte. Possui qualidades próximas das atribuídas a Áries. Significa masculinidade, força, energia, impulso, ação, agressividade, conflito.'},
  {nome:'Amissio',pt:'a Perda',l:[1,2,1,2],comp:'Água sobre Água',cor:'#009966',desc:'Excesso de emoções. Destempero, perdas.'},
  {nome:'Acquisitio',pt:'o Ganho',l:[2,1,2,1],comp:'Ar sobre Ar',cor:'#006633',desc:'Predomínio do racional, intelectual. Movimento, ganhos.'},
  {nome:'Conjunctio',pt:'a Conjunção',l:[2,1,1,2],comp:'Ar sobre Água',cor:'#99CC66',desc:'Encontro, união, contato, acordo, parceria, comunicação e recuperação do que estava perdido. O ponto onde dois caminhos se tocam.'},
  {nome:'Carcer',pt:'a Prisão',l:[1,2,2,1],comp:'Água sobre Ar',cor:'#CCCC99',desc:'Aprisionamento; algo limitante e problemas maiores do que a capacidade de resolvê-los. Impotência.'},
  {nome:'Cauda Draconis',pt:'a Cauda do Dragão',l:[1,1,1,2],comp:'Fogo sobre Água',cor:'#FFFF00',desc:'Algo que desce, voltado para baixo, para o escuro, descendente; materialismo, apego, decadência, término, a morte do espírito.'},
  {nome:'Tristitia',pt:'a Tristeza',l:[2,2,2,1],comp:'Terra sobre Ar',cor:'#996600',desc:'Tristeza, melancolia, sofrimento, solidão, depressão, desânimo, perda de ânimo, desmotivação.'}
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
  s+=f?`<rect width="64" height="88" rx="5" fill="${f.cor}"/>`:'<rect class="tile-vazio" width="64" height="88" rx="5"/>';
  l.forEach((v,r)=>{
    const y=16+r*20;
    if(v===1){s+=`<circle class="dot" cx="32" cy="${y}" r="6"/>`;}
    else if(v===2){s+=`<circle class="dot" cx="20" cy="${y}" r="6"/><circle class="dot" cx="44" cy="${y}" r="6"/>`;}
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

function celula(n){
  const f=figura(n.l);
  return `<button type="button" class="cell ${n.papel==='Juiz'?'juiz':''}" data-open="${n.id}" ${f?'':'disabled'} aria-label="${n.rot}: ${f?f.nome:'ainda sem figura'}">
    ${tile(n.l)}
    <span><span class="cell-rot">${n.rot}</span><span class="cell-nome">${f?f.nome:'—'}</span><span class="cell-f">${n.f}</span></span>
  </button>`;
}
function renderMapa(N){
  const tiers=[
    ['Mães','A tiragem física, nas quatro posições.',N.M],
    ['Tias','Cada tia reúne uma mesma linha das quatro mães: Ar, Fogo, Água e Terra.',N.T],
    ['Filhas','Somas das mães, duas a duas.',N.F],
    ['Sobrinhas','Somas das tias, duas a duas.',N.S],
    ['Passado e Futuro','O passado soma as filhas. O futuro soma as sobrinhas.',[N.P,N.FU]],
    ['Juiz','Passado mais Futuro.',[N.J]],
    ['Conselho',estado.regra==='classica'?'1ª filha mais o Passado.':'1ª filha mais o Passado.',[N.C]]
  ];
  $('#mapa').innerHTML=tiers.map(([t,nota,lista])=>`
    <div class="tier">
      <div class="tier-head"><h3>${t}</h3><p>${nota}</p></div>
      <div class="cells">${lista.map(celula).join('')}</div>
    </div>`).join('');
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
    const alvo=$('#captura');
    const bg=getComputedStyle(document.body).backgroundColor;
    const canvas=await html2canvas(alvo,{backgroundColor:bg,scale:Math.max(2,window.devicePixelRatio||1),useCORS:true,logging:false});
    const blob=await new Promise(res=>canvas.toBlob(res,'image/png'));
    if(!blob) throw new Error('sem imagem');
    const arq=new File([blob],'mapa-geomantico.png',{type:'image/png'});
    if(navigator.canShare&&navigator.canShare({files:[arq]})&&/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)){
      try{await navigator.share({files:[arq],title:'Mapa geomântico'});aviso('Imagem pronta');return;}
      catch(err){if(err&&err.name==='AbortError'){av.textContent='';return;}}
    }
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;a.download='mapa-geomantico.png';
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
