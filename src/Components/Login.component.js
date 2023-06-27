import React from "react";
import { Link } from "react-router-dom";
import "../index.css";


class Login extends React.Component {
  render() {
    return (
      <div class="container-fluid">
      <div class="row d-flex">
          <div class="col-md-4 bg-cinza vh-100">
              <form action="/Processar-login" method="get" style="width: 23rem;">
                  <h3 class="fw-normal mt-5 pb-2 text-white">Login</h3>
                      <div class="form-outline mb-4">
                          <label class="form-label text-white" for="user">Usuário</label>
                          <input name="usuario" type="text" class="form-control form-control-lg" id="user" placeholder="Insira um usuário"/>
                      </div>
      
                      <div class="form-outline mb-4">
                          <label class="form-label text-white" for="password">Senha</label>
                          <input name="senha" type="password" class="form-control form-control-lg" id="password" placeholder="Insira uma senha"/>
                      </div>
                      <div class="pt-1 mb-4">
                          <button class="btn btn-info btn-lg btn-block text-white" type="submit">Login</button>
                      </div>
              </form>
          </div>
         
      </div>
  </div>
    );
  }
}

export default Login;
