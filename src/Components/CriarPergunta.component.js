import React, { useState } from "react";
import axios from "axios";
import styles from "./CriarTeste.module.css";

const CriarPergunta = () => {
  const [nomeTeste, setNomeTeste] = useState("");
  const [perguntas, setPerguntas] = useState([
    {
      pergunta: "",
      itemA: "",
      itemB: "",
      itemC: "",
      itemD: "",
      alternativaCerta: "",
    },
  ]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newPerguntas = [...perguntas];
    newPerguntas[index][name] = value;
    setPerguntas(newPerguntas);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:1000/api/cadastroTeste",
        { testes: [{ nomeTeste, perguntas }] }
      );
      console.log(response.data);
      // Lógica adicional após o cadastro do teste
    } catch (error) {
      console.error(error);
      // Tratamento de erros
    }
  };

  const addPergunta = () => {
    setPerguntas([
      ...perguntas,
      {
        pergunta: "",
        itemA: "",
        itemB: "",
        itemC: "",
        itemD: "",
        alternativaCerta: "",
      },
    ]);
  };

  const removePergunta = (index) => {
    const newPerguntas = [...perguntas];
    newPerguntas.splice(index, 1);
    setPerguntas(newPerguntas);
  };

  return (
    <div className={styles.content}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={nomeTeste}
            onChange={(e) => setNomeTeste(e.target.value)}
            className={styles.nomeTest}
            placeholder="Nome do teste"
          />
        </div>

        {perguntas.map((pergunta, index) => (
          <div key={index}>
            <h3>Pergunta {index + 1}:</h3>
            <div>
              <input
                type="text"
                name="pergunta"
                value={pergunta.pergunta}
                onChange={(e) => handleInputChange(index, e)}
                className={styles.pergunta}
                placeholder="Pergunta"
              />
            </div>
            <div>
              <input
                type="text"
                name="itemA"
                value={pergunta.itemA}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Item A"
              />
            </div>
            <div>
              <input
                type="text"
                name="itemB"
                value={pergunta.itemB}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Item B"
              />
            </div>
            <div>
              <input
                type="text"
                name="itemC"
                value={pergunta.itemC}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Item C"
              />
            </div>
            <div>
              <input
                type="text"
                name="itemD"
                value={pergunta.itemD}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Item D"
              />
            </div>
            <div>
              <input
                type="text"
                name="alternativaCerta"
                value={pergunta.alternativaCerta}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Alternativa certa"
              />
            </div>
            {index > 0 && (
              <button onClick={() => removePergunta(index)}>
                Remover Pergunta
              </button>
            )}
          </div>
        ))}

        <button onClick={addPergunta}>Adicionar Pergunta</button>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default CriarPergunta;