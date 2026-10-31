// ============================================================
// components/SecaoPergunta.jsx
// Campo onde a pessoa escreve a pergunta da tiragem.
//
// É um componente CONTROLADO: o texto vive no estado do App, e o <textarea>
// apenas mostra `valor` e avisa (onMudar) quando a pessoa digita.
// ============================================================
import Secao from './Secao';

const LIMITE = 300;

// Props:
//   valor  : o texto atual da pergunta
//   onMudar: função chamada com o novo texto a cada tecla
export default function SecaoPergunta({ valor, onMudar }) {
  return (
    <Secao idTitulo="h-pergunta">
      <h2 id="h-pergunta">A pergunta</h2>
      <p className="sub">
        Escreva a pergunta feita para esta tiragem, ela aparecerá no mapa
        completo e na imagem salva.
      </p>
      <div className="pergunta">
        {/* `vh` = visualmente escondido, mas lido por leitores de tela.
            Em JSX, `for` vira `htmlFor` e `class` vira `className`. */}
        <label htmlFor="pergunta" className="vh">Pergunta da tiragem</label>
        <textarea
          id="pergunta"
          rows={2}
          maxLength={LIMITE}
          placeholder="Ex.: Como será meu futuro acadêmico?"
          value={valor}
          onChange={(e) => onMudar(e.target.value)}
        />
        {/* Contador de caracteres, sempre em dia porque vem do mesmo `valor`. */}
        <span className="status">{valor.length} / {LIMITE}</span>
      </div>
    </Secao>
  );
}
