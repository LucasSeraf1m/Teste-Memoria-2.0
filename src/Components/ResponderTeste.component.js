import React, { useState } from "react";
import styles from "./ResponderTeste.module.css";

const ResponderTeste = ({ teste }) => {
  const [respostas, setRespostas] = useState({});
  const [pontuacao, setPontuacao] = useState(0);
  const [submetido, setSubmetido] = useState(false);

  const handleRespostaChange = (perguntaId, alternativa) => {
    setRespostas((prevRespostas) => ({
      ...prevRespostas,
      [perguntaId]: alternativa,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let novaPontuacao = 0;
    teste.perguntas.forEach((pergunta) => {
      if (respostas[pergunta._id] === pergunta.alternativaCerta) {
        novaPontuacao += 1;
      }
    });

    setPontuacao(novaPontuacao);
    setSubmetido(true);
  };

  return (
    <div>
      <h2>Responder Teste</h2>
      <form onSubmit={handleSubmit}>
        {teste.perguntas.map((pergunta) => (
          <div key={pergunta._id}>
            <h3>{pergunta.pergunta}</h3>
            <div>
              <label>
                <input
                  type="radio"
                  name={`pergunta_${pergunta._id}`}
                  value={pergunta.itemA}
                  checked={respostas[pergunta._id] === pergunta.itemA}
                  onChange={() =>
                    handleRespostaChange(pergunta._id, pergunta.itemA)
                  }
                  disabled={submetido} // Desabilita as opções de resposta após submeter
                />
                {pergunta.itemA}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name={`pergunta_${pergunta._id}`}
                  value={pergunta.itemB}
                  checked={respostas[pergunta._id] === pergunta.itemB}
                  onChange={() =>
                    handleRespostaChange(pergunta._id, pergunta.itemB)
                  }
                  disabled={submetido}
                />
                {pergunta.itemB}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name={`pergunta_${pergunta._id}`}
                  value={pergunta.itemC}
                  checked={respostas[pergunta._id] === pergunta.itemC}
                  onChange={() =>
                    handleRespostaChange(pergunta._id, pergunta.itemC)
                  }
                  disabled={submetido}
                />
                {pergunta.itemC}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name={`pergunta_${pergunta._id}`}
                  value={pergunta.itemD}
                  checked={respostas[pergunta._id] === pergunta.itemD}
                  onChange={() =>
                    handleRespostaChange(pergunta._id, pergunta.itemD)
                  }
                  disabled={submetido}
                />
                {pergunta.itemD}
              </label>
            </div>
          </div>
        ))}
        <button type="submit" disabled={submetido}>
          Enviar Respostas
        </button>
      </form>
      {submetido && <p className={styles}>Pontuação: {pontuacao}</p>}
    </div>
  );
};

export default ResponderTeste;
