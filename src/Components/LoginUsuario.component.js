import React,{useState} from "react"
import axios from "axios"

function LoginUsuario(){
    const [usuario,setUsuario]=useState('')

    const [senha,setSenha]=useState('')

    async function hadleSubmit(e){
e.preventDefault()
try{
    const response = await axios.post('http://localhost:1000/api/login', { usuario, senha });
    setUsuario('');
    setSenha('');

}
catch(error){
    console.log(error)
}


    } 
   
   
    return(

<div>
    <form onSubmit={hadleSubmit}>
        <input type="text" placeholder="Usuario" onChange={(e)=>setUsuario(e.target.value)}></input>
        <input type="text" placeholder="Usuario" onChange={(e)=>setSenha(e.target.value)}></input>
        <button type="submit">Login</button>

    </form>
</div>


    )


}
export default LoginUsuario;