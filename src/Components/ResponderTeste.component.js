import React, { useState } from "react";

const ResponderTeste = ({ teste }) => {
  const [respostas, setRespostas] = useState({});
  const [pontuacao, setPontuacao] = useState(0);

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
                  onChange={() => handleRespostaChange(pergunta._id, pergunta.itemA)}
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
                  onChange={() => handleRespostaChange(pergunta._id, pergunta.itemB)}
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
                  onChange={() => handleRespostaChange(pergunta._id, pergunta.itemC)}
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
                  onChange={() => handleRespostaChange(pergunta._id, pergunta.itemD)}
                />
                {pergunta.itemD}
              </label>
            </div>
          </div>
        ))}
        <button type="submit">Enviar Respostas</button>
      </form>
      <p>Pontuação: {pontuacao}</p>
    </div>
  );
};

export default ResponderTeste;
