// ============================================================
// components/Secao.jsx
//
// A moldura que todas as seções repetem:
//   <section class="sec"> <div class="wrap"> ...conteúdo... </div> </section>
// Escrita uma vez aqui, em vez de repetida 5 vezes.
// ============================================================

// Props:
//   idTitulo : id do <h2> da seção (leitores de tela usam para anunciar a seção)
//   children : tudo que for escrito ENTRE as tags <Secao> e </Secao>
export default function Secao({ idTitulo, children }) {
  return (
    <section className="sec" aria-labelledby={idTitulo}>
      <div className="wrap">{children}</div>
    </section>
  );
}
