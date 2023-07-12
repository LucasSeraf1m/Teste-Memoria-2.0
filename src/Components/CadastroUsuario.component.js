import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./LoginCadastroUsuario.module.css";

export default function CadastrarUsuario() {
  const [usuario, setUsuario] = useState(""); // useState cria os estados e suas funções
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // permite navegar para outras rotas

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1000/api/cadastro", {
        usuario,
        senha,
      });

      navigate("/login");

      setUsuario("");
      setSenha("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.contentLogin}>
      <form onSubmit={handleSubmit}>
        <h2>Cadastro</h2>

        <input
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)} // atualiza o estado com o valor digitado
          type="text"
        ></input>
        <input
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          type="password"
        ></input>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
