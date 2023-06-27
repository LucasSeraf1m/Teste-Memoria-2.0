import React from "react";
import { Link } from "react-router-dom";
// import Rota from "../backend/routes/rota.route";
import "../index.css";

// Pra fazer os redirecionamentos das paginas usei Link do React

class Home extends React.Component {
  render(){ 
    return (
      <body class="bg-degrade">
        
        <nav class="navbar navbar-expand-lg navbar-dark shadow-5-strong">
          <div class="container-fluid">
            <Link to="/" class="navbar-brand">
              Questionários
            </Link>
            <button
              type="button"
              class="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <div class="navbar-nav">
                <Link to="/" class="nav-item nav-link active">
                  Home
                </Link>
                <Link to="/criarTeste" class="nav-item nav-link">
                  Fazer um questionário
                </Link>
                <Link to="/resultados" class="nav-item nav-link">
                  Resultados
                </Link>
              </div>
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
                <Link to="/criarTeste" class="text-decoration-none text-dark">
                  Criar Questionário
                </Link>
              </button>
              <button type="button" class="btn btn-info my-3">
                {" "}
                
                <Link to="responder" class="text-decoration-none text-dark" >
                  Iniciar Questionário
                </Link>
              </button>
              <button type="button" class="btn btn-info my-3">
                {" "}
                <Link to="/resultados" class="text-decoration-none text-dark">
                  Resultados
                </Link>
              </button>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

export default Home;
