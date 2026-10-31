// ============================================================
// hooks/useAviso.js
//
// Um HOOK PERSONALIZADO. Hook é uma função cujo nome começa com "use" e que
// pode usar outros hooks (useState, useRef...). Serve para reaproveitar
// lógica entre componentes.
//
// Este cuida dos avisos temporários ("Copiado", "Imagem salva"...):
// o texto aparece e some sozinho depois de alguns segundos.
// ============================================================
import { useCallback, useEffect, useRef, useState } from 'react';

export function useAviso(duracaoPadrao = 2200) {
  // texto: o aviso atual ('' = nenhum). Quando muda, o componente redesenha.
  const [texto, setTexto] = useState('');
  // useRef guarda um valor que NÃO provoca redesenho: aqui, o id do temporizador.
  const temporizador = useRef(null);

  // Mostra um aviso. `duracao` 0 deixa o aviso fixo (usado em "Gerando…").
  const mostrar = useCallback(
    (msg, duracao = duracaoPadrao) => {
      clearTimeout(temporizador.current); // cancela o temporizador anterior
      setTexto(msg);
      if (duracao > 0) {
        temporizador.current = setTimeout(() => setTexto(''), duracao);
      }
    },
    [duracaoPadrao]
  );

  // Apaga o aviso na hora.
  const limpar = useCallback(() => {
    clearTimeout(temporizador.current);
    setTexto('');
  }, []);

  // Ao sair da tela, cancela o temporizador pendente (evita erro).
  useEffect(() => () => clearTimeout(temporizador.current), []);

  return [texto, mostrar, limpar];
}
