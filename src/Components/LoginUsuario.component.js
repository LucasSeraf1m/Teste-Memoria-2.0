import React,{useState} from "react"
import { useNavigate} from "react-router-dom"
import axios from "axios"
import styles from './LoginCadastroUsuario.module.css'

function LoginUsuario(){
    const [usuario,setUsuario]=useState('')
    const [senha,setSenha]=useState('')
    const [islogin,setIsLogin]=useState(false)
    const navigate = useNavigate();

    async function hadleSubmit(e){
e.preventDefault()
try{
    const response = await axios.post('http://localhost:1000/api/login',{usuario,senha});
setIsLogin(true)  

navigate('/home')

if(islogin){
    return navigate("/home",{replace:true})
}
  
setUsuario('');
setSenha('');

 
}
catch(error){
    console.log(error)
}
 }  
    return(<div className={styles.contentLogin}>
    <form onSubmit={hadleSubmit}>
    <h2>Login</h2>

        <input type="text" placeholder="Usuario" onChange={(e)=>setUsuario(e.target.value)}></input>
        <input type="text" placeholder="Senha" onChange={(e)=>setSenha(e.target.value)}></input>
        <button type="submit">Login</button>
    </form>
</div> )
}
export default LoginUsuario;