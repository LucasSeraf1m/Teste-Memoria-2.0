import React from "react";
import { Link } from "react-router-dom";
class ResponderTeste extends React.Component{
render(){
    return(
        <body class="bg-degrade">
    <nav class="navbar navbar-expand-lg navbar-dark shadow-5-strong">
        <div class="container-fluid"> 
          <Link to="/" class="navbar-brand">Questionários</Link>
          <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
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

    <div id="container-pai" class="container my-5">
      <div class="row">
        <div class="col-md-12 d-flex justify-content-center">
          <div id="lista-questionarios" class="d-flex justify-content-md-center p-5"></div>
        </div>
      </div>
    </div>

    

    <div id="lista-perguntas"></div>
  <div class="container-fluid">
    <div class="row d-flex">
      <div class="col-md-6">
        <button id="nova-pergunta" class="btn-perguntas">
          Proxima Pergunta
        </button>
      </div>
      <div class="col-md-6 text-end">
        <button id="submit" class="btn-perguntas">
          Finalizar Questionário
        </button>
      </div>
    </div>
  </div>
    <script src="../js/lista_get.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossorigin="anonymous"></script>
</body>
        )
}
}
export default ResponderTeste;