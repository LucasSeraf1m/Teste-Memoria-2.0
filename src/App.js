import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.component";
import ResponderTeste from "./components/ResponderTeste.component";
import CriarTeste from "./components/CriarTeste.component";
import Resultados from "./components/Resultados.component";
import Login from "./components/LoginUsuario.component";
import Header from "./components/Header.component";
import CadastrarUsuario from "./components/CadastroUsuario.component";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastrar" element={<CadastrarUsuario />} />
          <Route path="/responder" element={<ResponderTeste />} />
          <Route path="/criarTeste" element={<CriarTeste />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
