import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListarTeste = ({ onTesteSelecionado }) => {
  const [testes, setTestes] = useState([]);

  useEffect(() => {
    const fetchTestes = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/testes');
        setTestes(response.data.map((item) => item.testes[0]));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTestes();
  }, []);

  const handleSelecionarTeste = (teste) => {
    onTesteSelecionado(teste);
  };

  return (
    <div>
      <h2>Lista de Testes</h2>
      <ul>
        {testes.map((teste) => (
          <li key={teste._id} onClick={() => handleSelecionarTeste(teste)}>
            {teste.nomeTeste}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarTeste;