import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CriarTeste.module.css";
import CriarPergunta from "./CriarPergunta.component";

const CriarTeste = () => {
  const [nomeTeste, setNomeTeste] = useState("");
  const [testes, setTestes] = useState([]);
  const [mostrarCriarPergunta, setMostrarCriarPergunta] = useState(false);
  const [testeSelecionado, setTesteSelecionado] = useState(null);

  useEffect(() => { // requisit os testes assim que o componente é renderizado
    const fetchTestes = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/testes");
        setTestes(response.data.map((item) => item.testes[0])); // extrair o primeiro item do array testes
      } catch (error) {
        console.error(error);
      }
    };

    fetchTestes(); // executada quando o componente é montado
  }, []);

  const handleNomeTesteChange = (event) => {
    setNomeTeste(event.target.value); // atualiza o estado com o valor digitado
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
    const testeSelecionado = testes.find((teste) => teste.nomeTeste === nomeTeste); // recebe o nome do teste como argumento e encontra o teste correspondente no estado testes
    setTesteSelecionado(testeSelecionado);
    setMostrarCriarPergunta(true);
  };

  const atualizarPerguntas = async (perguntasAtualizadas) => {
    try {
      if (!testeSelecionado || !perguntasAtualizadas) {
        console.error("Teste selecionado ou perguntas não estão definidos corretamente.");
        return;
      }

      const testeAtualizado = {
        ...testeSelecionado,
        perguntas: perguntasAtualizadas,
      };

      await axios.put(
        `http://localhost:1000/api/cadastroTeste/${testeSelecionado._id}`,
        testeAtualizado
      );

      const testesAtualizados = testes.map((teste) => {
        if (teste._id === testeAtualizado._id) {
          return testeAtualizado;
        }
        return teste;
      });

      setTestes(testesAtualizados);
    } catch (error) {
      console.error(error);
      // Tratamento de erros
    }
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
      {mostrarCriarPergunta && testeSelecionado && ( // se o estado mostrarCriarPergunta for verdadeiro e testeSelecionado for definido, o componente CriarPergunta é renderizado
        <CriarPergunta
          testeSelecionado={testeSelecionado}
          onPerguntasAtualizadas={atualizarPerguntas}
        />
      )}
    </div>
  );
};

export default CriarTeste;
