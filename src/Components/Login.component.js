import React from "react";
import { Link } from "react-router-dom";
import "../index.css";


class Login extends React.Component {
  render() {
    return (
      <body class="bg-degrade">
        <nav class="navbar navbar-expand-lg navbar-dark shadow-5-strong">
          <div class="container-fluid">
          <Link to="/" class="navbar-brand">Questionários</Link>

            <button
              type="button"
              class="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
            
            </div>
          </div>
        </nav>
        <div class="container my-5 text-center">
          <div class="row">
            <div class="col-md-12">
              <h2 class="text-white">Perguntas e Respostas</h2>
              <h4 class="text-white">Crie Testes e Faça Perguntas!</h4>
              <button type="button" class="btn btn-info my-3">
                {" "}
                <a href="/login" class="text-decoration-none text-dark">
                  Criar Questionário
                </a>
              </button>
              <button type="button" class="btn btn-info my-3">
                {" "}
                <a
                  href="/questionarioFazer"
                  class="text-decoration-none text-dark"
                >
                  Iniciar Questionário
                </a>
              </button>
              <button type="button" class="btn btn-info my-3">
                {" "}
                <a href="/resultados" class="text-decoration-none text-dark">
                  Resultados
                </a>
              </button>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

export default Login;
