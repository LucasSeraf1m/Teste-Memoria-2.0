import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./LoginCadastroUsuario.module.css";

// import { Link, NavLink } from "react-router-dom";

export default function CadastrarUsuario() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [islogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  // const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1000/api/cadastro", {
        usuario,
        senha,
      });
      setIsLogin(true);

      navigate("/login");

      if (islogin) {
        return navigate("/login", { replace: true });
      }
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
          onChange={(e) => setUsuario(e.target.value)}
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
