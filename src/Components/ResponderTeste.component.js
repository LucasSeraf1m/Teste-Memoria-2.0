import React, { useState, useEffect } from "react";
import styles from "./ResponderTeste.module.css";
import axios from "axios";

const ResponderTeste = ({ teste, onVoltar }) => {
  const [respostas, setRespostas] = useState({});
  const [pontuacao, setPontuacao] = useState(0);
  const [submetido, setSubmetido] = useState(false);
  const [perguntasEmbaralhadas, setPerguntasEmbaralhadas] = useState([]);

  useEffect(() => {
    // Embaralhar as perguntas ao inicializar o componente
    const embaralharPerguntas = () => {
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

  const handleRespostaChange = (perguntaId, alternativa) => {
    setRespostas((prevRespostas) => ({
      ...prevRespostas,
      [perguntaId]: alternativa,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let novaPontuacao = 0;
    perguntasEmbaralhadas.forEach((pergunta) => {
      if (respostas[pergunta._id] === pergunta[pergunta.alternativaCerta]) {
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
      console.log(response.data); // Exibe a resposta do servidor (opcional)
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
        {perguntasEmbaralhadas.map((pergunta) => (
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
                    handleRespostaChange(pergunta._id, pergunta.itemA)
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
