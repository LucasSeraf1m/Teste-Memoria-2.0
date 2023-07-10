import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
function Home(){
 
    return (
      <body class="bg-degrade">
        <div class="container my-5 text-center">
          <div class="row">
            <div class="col-md-12">
              <h2 class="text-white">Perguntas e Respostas</h2>
              <h4 class="text-white">Crie Testes e Faça Perguntas!</h4>
              <button type="button" class="btn btn-info my-3">
                {" "}
                <Link to="/login" class="text-decoration-none text-dark">
                  Criar Questionário
                </Link>
              </button>
             
              <button type="button" class="btn btn-info my-3">
                {" "}
                
                <Link to="/responder" class="text-decoration-none text-dark" >
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

export default Home;