# Mapa Geomântico em React

O mesmo site de geomancia, reescrito com **componentes React** (Vite). A aparência é idêntica à do original: foi conferida pixel a pixel.

## Como rodar

```bash
npm install        # baixa as dependências (só na primeira vez)
npm run dev        # abre o site em modo desenvolvimento (http://localhost:5173)
```

Outros comandos:

```bash
npm run build         # gera a pasta dist/ para publicar
npm run build:single  # gera dist/index.html, UM arquivo que abre com duplo clique
```

## Estrutura

```
index.html                  única página HTML (quase vazia: só <div id="root">)
src/
  main.jsx                  ponto de entrada: coloca <App /> na página
  App.jsx                   junta as seções e liga estado e ações
  estilos/style.css         o CSS original, sem mudanças
  dados/figuras.js          as 16 figuras e os cálculos (sem React)
  hooks/
    useGeomancia.js         estado do site + localStorage + dados calculados
    useAviso.js             aviso temporário ("Copiado", "Imagem salva"...)
  utils/
    escudo.js               garante que nenhuma casa saia do contorno do escudo
    imagem.js               gera o PNG do botão "Salvar imagem"
    leitura.js              texto copiado e normalização da busca
  components/
    Cabecalho, Secao, SecaoPergunta, SecaoMaes, SecaoMapa,
    SecaoLeitura, SecaoCatalogo   as seções da página
    CartaoMae, CartaoResultado, CartaoFigura   cartões repetidos
    Escudo, Celula, NotasMapa     o mapa
    Peca, Elemento, PontosOpcao   peças visuais pequenas e reutilizadas
    Painel                        painel de significado (diálogo)
```

## Como as ideias do React aparecem aqui

- **Componente**: função com nome em maiúscula que devolve JSX (ex.: `Peca`, `Escudo`).
- **Props**: os parâmetros do componente (ex.: `<Celula no={...} linha={1} coluna={9} />`).
- **Estado** (`useState`): a memória do site, em `useGeomancia.js`. Quando muda, a tela se redesenha.
- **Dados derivados** (`useMemo`): tias, filhas, juiz etc. são calculados a partir das 4 mães, nunca guardados.
- **Efeitos** (`useEffect`, `useLayoutEffect`): salvar no navegador, ouvir a tecla Esc e ajustar o escudo depois de desenhado.
- **`memo` / `useCallback`**: evitam redesenhar o que não mudou (mexer numa mãe não redesenha as outras três).

## Sobre o encaixe no escudo

Depois de desenhar o escudo, `utils/escudo.js` confere se os quatro cantos de cada casa estão dentro do contorno. Se alguma casa passar, aumenta o espaço abaixo da grade até tudo caber. O ajuste roda a cada mudança no mapa, ao redimensionar a janela, quando as fontes carregam e, com folga maior, na imagem salva.
