import React, { useState, useEffect } from 'react';
import ResponderTeste from "./ResponderTeste.component";
import axios from 'axios';
import styles from "./ListarTeste.module.css";

const ListarTeste = () => {
  const [testes, setTestes] = useState([]);
  const [testeSelecionado, setTesteSelecionado] = useState(null);

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
    setTesteSelecionado(teste);
  };

  const handleVoltar = () => {
    setTesteSelecionado(null);
  };

  return (
    <div>
      {!testeSelecionado ? (
        <div className={styles.content}>
          <h2>Lista de Testes</h2>
          <div className={styles.lis}>
          <ul className={styles.listaTestes}>
            {testes.map((teste) => (
              <li key={teste._id} onClick={() => handleSelecionarTeste(teste)}>
                {teste.nomeTeste}
              </li>
            ))}
          </ul>
            </div>
        
        </div>
      ) : (
        <ResponderTeste teste={testeSelecionado} onVoltar={handleVoltar} />
      )}
    </div>
  );
};

export default ListarTeste;
