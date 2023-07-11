import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CriarPergunta from './CriarPergunta.component';

const CriarTeste = () => {
  const [nomeTeste, setNomeTeste] = useState('');
  const [testes, setTestes] = useState([]);
  const [mostrarCriarPergunta, setMostrarCriarPergunta] = useState(false);
  const [testeSelecionado, setTesteSelecionado] = useState('');

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

      const response = await axios.post('/cadastroTeste', { testes: [novoTeste] });
      setTestes([...testes, response.data]);
      setNomeTeste('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelecionarTeste = (nomeTeste) => {
    setTesteSelecionado(nomeTeste);
    setMostrarCriarPergunta(true);
  };

  return (
    <div>
      <h2>Criar Teste</h2>
      <div>
        <label>Nome do Teste:</label>
        <input type="text" value={nomeTeste} onChange={handleNomeTesteChange} />
        <button onClick={handleCriarTeste}>Criar</button>
      </div>

      <h2>Testes Criados:</h2>
      <ul>
        {testes.map((teste) => (
          <li key={teste._id} onClick={() => handleSelecionarTeste(teste.nomeTeste)}>
            {teste.nomeTeste}
          </li>
        ))}
      </ul>

      {mostrarCriarPergunta && <CriarPergunta nomeTeste={testeSelecionado} />}
    </div>
  );
};

export default CriarTeste;
