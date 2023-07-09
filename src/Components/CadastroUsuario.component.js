import React, {useState} from "react"
import axios from "axios";
// import { Link, NavLink } from "react-router-dom";

export default function CadastrarUsuario(){
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    // const [error, setError] = useState('');


    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:1000/api/cadastro', { usuario, senha });
            setUsuario('');
            setSenha('');
          
           
        }catch(error){
            console.log(error)
        }

    }

    return(

        <div>
<form onSubmit={handleSubmit}>

<input placeholder="Usuario" value={usuario} onChange={(e)=>setUsuario(e.target.value)}  type="text"></input>
<input placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)}  type="password"></input>
<button type="submit">Cadastrar</button>
</form>

        </div>
    )
}