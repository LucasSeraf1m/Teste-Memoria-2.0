import React, { useState } from "react";
import axios from "axios";
import styles from "./CriarTeste.module.css";

const CriarPergunta = ({ testeSelecionado, onPerguntasAtualizadas }) => {
  const [perguntas, setPerguntas] = useState(testeSelecionado.perguntas);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newPerguntas = [...perguntas];
    newPerguntas[index][name] = value;
    setPerguntas(newPerguntas);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const testeAtualizado = {
        ...testeSelecionado,
        perguntas: perguntas,
      };
  
      await axios.put(`http://localhost:1000/api/cadastroTeste/${testeSelecionado._id}`, testeAtualizado);
      onPerguntasAtualizadas(perguntas);
      // Lógica adicional após a atualização do teste
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
        {testeSelecionado && (
          <div className={styles.nomeTeste}>
            <input
              type="text"
              value={testeSelecionado.nomeTeste}
              disabled
            />
          </div>
        )}
        <div className={styles.listaPerguntas}>  
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
        </div>
        <button onClick={addPergunta}>Adicionar Pergunta</button>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default CriarPergunta;
