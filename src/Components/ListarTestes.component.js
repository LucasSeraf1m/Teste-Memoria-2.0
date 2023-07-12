import React, { useState, useEffect } from 'react';
import ResponderTeste from "./ResponderTeste.component";
import axios from 'axios';
import styles from "./ResponderTeste.module.css";

const ListarTeste = () => {
  const [testes, setTestes] = useState([]);
  const [testeSelecionado, setTesteSelecionado] = useState(null);

  useEffect(() => {
    const fetchTestes = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/testes');
        setTestes(response.data.map((item) => item.testes[0])); // atualiza o estado testes com os dados recebidos do servidor
      } catch (error) {
        console.error(error);
      }
    };

    fetchTestes();
  }, []);

  const handleSelecionarTeste = (teste) => {
    setTesteSelecionado(teste); // atualiza o estado com o teste selecionado
  };

  const handleVoltar = () => {
    setTesteSelecionado(null);
  };

  return (
    <div className={styles.tudo}>
      {!testeSelecionado ? ( // se testeSelecionado for falso, renderiza a lista de testes
        <div>
          <h2>Lista de Testes</h2>
          <ul className={styles.listaTestes}>
            {testes.map((teste) => (
              <li key={teste._id} onClick={() => handleSelecionarTeste(teste)}>
                {teste.nomeTeste}
              </li>
            ))}
          </ul>
        </div>
      ) : ( // se for verdadeiro renderiza ResponderTeste
        <ResponderTeste teste={testeSelecionado} onVoltar={handleVoltar} />
      )}
    </div>
  );
};

export default ListarTeste;
