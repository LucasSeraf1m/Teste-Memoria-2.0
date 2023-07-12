import React, { useState, useEffect } from "react";
import styles from "./ResponderTeste.module.css";
import axios from "axios";

const ResponderTeste = ({ teste, onVoltar }) => {
  const [respostas, setRespostas] = useState({}); // armazena as respostas
  const [pontuacao, setPontuacao] = useState(0); // armazena a pontuação obtida
  const [submetido, setSubmetido] = useState(false); // controla se o teste foi submetido
  const [perguntasEmbaralhadas, setPerguntasEmbaralhadas] = useState([]); // armazena as perguntas em ordem aleatória

  useEffect(() => {
    const embaralharPerguntas = () => { // embaralha as perguntas ao iniciar o componente
      const perguntasCopiadas = [...teste.perguntas];
      const perguntasEmbaralhadas = [];

      while (perguntasCopiadas.length > 0) {
        const randomIndex = Math.floor(Math.random() * perguntasCopiadas.length);
        const perguntaSelecionada = perguntasCopiadas.splice(randomIndex, 1)[0];
        perguntasEmbaralhadas.push(perguntaSelecionada);
      }

      setPerguntasEmbaralhadas(perguntasEmbaralhadas);
    };

    embaralharPerguntas();
  }, [teste.perguntas]);

  const handleRespostaChange = (perguntaId, alternativa) => { // atualiza as respostas selecionadas pelo usuário
    setRespostas((prevRespostas) => ({
      ...prevRespostas,
      [perguntaId]: alternativa,
    }));
  };

  const handleSubmit = async (event) => { 
    event.preventDefault();

    let novaPontuacao = 0;
    perguntasEmbaralhadas.forEach((pergunta) => {
      if (respostas[pergunta._id] === pergunta[pergunta.alternativaCerta]) { // compara as respostas selecionadas com as alternativas corretas
        novaPontuacao += 1;
      }
    });

    setPontuacao(novaPontuacao);
    setSubmetido(true);

    const testeRealizadoData = {
      teste: teste.nomeTeste,
      qtd_perguntas: Object.keys(respostas).length,
      qtd_acertos: novaPontuacao,
    };

    try {
      const response = await axios.post("http://localhost:1000/api/testeRealizado", testeRealizadoData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoltar = () => {
    onVoltar();
  };

  return (
    <div className={styles.content}>
      <h2>Responder Teste</h2>
      <form onSubmit={handleSubmit}>
        {perguntasEmbaralhadas.map((pergunta) => ( // mapeia as perguntas embaralhadas e exibe cada pergunta com as opções de resposta
          <div className={styles.pergunta} key={pergunta._id}>
            <h3>{pergunta.pergunta}</h3>
            <div>
              <label>
                <input
                  className={styles.input}
                  type="radio"
                  name={`pergunta_${pergunta._id}`}
                  value={pergunta.itemA}
                  checked={respostas[pergunta._id] === pergunta.itemA}
                  onChange={() =>
                    handleRespostaChange(pergunta._id, pergunta.itemA) // atualiza o estado respostas com a resposta selecionada pelo usuário
                  }
                  disabled={submetido}
                />
                {pergunta.itemA}
              </label>
            </div>
            <div>
              <label>
                <input
                  className={styles.input}
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
                  className={styles.input}
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
                  className={styles.input}
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
        <div className={styles.botoes}>
        <button type="submit" disabled={submetido}>
          Enviar
        </button>
        <button type="button" onClick={handleVoltar}>
          Voltar
        </button>
        </div>
      
      </form>
      {submetido && <p>Pontuação: {pontuacao}</p>}
    </div>
  );
};

export default ResponderTeste;
