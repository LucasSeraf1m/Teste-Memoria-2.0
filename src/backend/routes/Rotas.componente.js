import React from "react";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import Home from "../../Components/Home.component";
import CriarTeste from "../../Components/CriarTeste.component"
import ResponderTeste from "../../Components/ResponderTeste.component"
import Login from "../../Components/Login.component"
import Resultados from "../../Components/Resultados.component"


// Aqui estão as rotas de cada pagina



function Rotas(){

    return (
        <Router>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/responder" element={<ResponderTeste/>}/>
                <Route path="/criarTeste" element={<CriarTeste/>}/>
                <Route path="/resultados" element={<Resultados/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Router>
     
        )

}
export default Rotas


