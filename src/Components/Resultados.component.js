import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Resultados.module.css"

const Resultados = () => {
  const [testesRealizados, setTestesRealizados] = useState([]);

  useEffect(() => {
    const fetchTestesRealizados = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/testesRealizados");
        setTestesRealizados(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTestesRealizados();
  }, []);

  // Ordena os testes realizados pela maior quantidade de perguntas respondidas e respostas corretas
  const ordenarTestesRealizados = () => {
    const sortedTestesRealizados = [...testesRealizados].sort(
      (a, b) =>
        b.qtd_perguntas_respondidas - a.qtd_perguntas_respondidas ||
        b.qtd_acertos - a.qtd_acertos
    );
    return sortedTestesRealizados;
  };

  return (
    <div>
      <ul  className={styles.content}>
      <h2>Resultados</h2>

        {ordenarTestesRealizados().map((testeRealizado) => (
          <li key={testeRealizado._id}>
            <p>Nome do Teste: {testeRealizado.nomeTeste}</p>
            <p>Perguntas Respondidas: {testeRealizado.qtd_perguntas}</p>
            <p>Respostas Corretas: {testeRealizado.qtd_acertos}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resultados;
