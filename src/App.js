import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home.component";
import ResponderTeste from "./Components/ResponderTeste.component";
import CriarTeste from "./Components/CriarTeste.component";
import Resultados from "./Components/Resultados.component";
import Login from "./Components/LoginUsuario.component";
import Header from "./Components/Header.component";
import CadastrarUsuario from "./Components/CadastroUsuario.component";
import CriarPergunta from "./Components/CriarPergunta.component";
import ListarTestes from "./Components/ListarTestes.component";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/cadastrar" element={<CadastrarUsuario />} />
          <Route path="/responderTeste" element={<ResponderTeste />} />
          <Route path="/criarTeste" element={<CriarTeste />} />
          <Route path="/criarPergunta" element={<CriarPergunta />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listarTestes" element={<ListarTestes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;