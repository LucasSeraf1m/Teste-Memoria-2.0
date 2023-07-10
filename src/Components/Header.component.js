import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="nav navbar navbar-expand-lg navbar-dark shadow-5-strong">
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
              
                <Link to="/login" class="nav-item nav-link">
                 login
                </Link>
                <Link to="/cadastrar" class="nav-item nav-link">
                 cadastrar
                </Link>
            
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
