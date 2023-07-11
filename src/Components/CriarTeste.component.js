import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CriarTeste.module.css";
import CriarPergunta from "./CriarPergunta.component";

const CriarTeste = () => {
  const [nomeTeste, setNomeTeste] = useState("");
  const [testes, setTestes] = useState([]);
  const [mostrarCriarPergunta, setMostrarCriarPergunta] = useState(false);
  const [testeSelecionado, setTesteSelecionado] = useState(null);

  useEffect(() => {
    const fetchTestes = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/testes");
        setTestes(response.data.map((item) => item.testes[0])); // Ajuste para extrair o primeiro item do array "testes"
      } catch (error) {
        console.error(error);
      }
    };

    fetchTestes();
  }, []);

  const handleNomeTesteChange = (event) => {
    setNomeTeste(event.target.value);
  };

  const handleCriarTeste = async () => {
    try {
      const novoTeste = {
        nomeTeste,
        perguntas: [],
      };

      const response = await axios.post(
        "http://localhost:1000/api/cadastroTeste",
        { testes: [novoTeste] }
      );
      setTestes([...testes, response.data]);
      setNomeTeste("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelecionarTeste = (nomeTeste) => {
    const testeSelecionado = testes.find(
      (teste) => teste.nomeTeste === nomeTeste
    );
    setTesteSelecionado(testeSelecionado);
    setMostrarCriarPergunta(true);
  };

  const atualizarPerguntas = (perguntasAtualizadas) => {
    const testeAtualizado = { ...testeSelecionado };
    testeAtualizado.perguntas = perguntasAtualizadas;
    const testesAtualizados = testes.map((teste) => {
      if (teste._id === testeAtualizado._id) {
        return testeAtualizado;
      }
      return teste;
    });
    setTestes(testesAtualizados);
  };  

  return (
    <div>
      <div className={styles.divCriaTeste}>
        <h2>Criar Teste</h2>
        <div>
          <input
            type="text"
            value={nomeTeste}
            onChange={handleNomeTesteChange}
            placeholder="Nome do Teste"
          />
          <button onClick={handleCriarTeste}>Criar</button>
        </div>
        <h3>Testes Criados:</h3>
        <ul className={styles.listarTeste}>
          {testes.map((teste) => (
            <li
              key={teste._id}
              onClick={() => handleSelecionarTeste(teste.nomeTeste)}
            >
              {teste.nomeTeste}
            </li>
          ))}
        </ul>
      </div>
      {mostrarCriarPergunta && testeSelecionado && (
        <CriarPergunta
          testeSelecionado={testeSelecionado}
          onPerguntasAtualizadas={atualizarPerguntas}
        />
      )}
    </div>
  );
};

export default CriarTeste;
