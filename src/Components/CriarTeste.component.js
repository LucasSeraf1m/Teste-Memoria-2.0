import React, { useState } from 'react';
import axios from "axios";

import styles from './CriarTeste.module.css'
function CriarTeste() {

const [nomeTeste,setNomeTeste]= useState('')
  const [pergunta, setPergunta] = useState('');
    const [itemA, setItemA] = useState('');
    const [itemB, setItemB] = useState('');
    const [itemC, setItemC] = useState('');
    const [itemD, setItemD] = useState('');
    // const [perguntas,setPerguntas]=useState([])
    const [alternativaCerta, setAlternativaCerta] = useState('');
    
    // setPerguntas(pergunta,itemA,itemB,itemC,itemD,alternativaCerta)


    async function handleSubmit(e){
  e.preventDefault()

try{
  const response = await axios.post('http://localhost:1000/api/cadastroTeste',{nomeTeste,pergunta,
  itemA,itemB,itemC,itemD,alternativaCerta})
  // setNomeTeste('')
  setPergunta('')
  setItemA('')
  setItemB('')
  setItemC('')
  setItemD('')
  setAlternativaCerta('')
  console.log(pergunta,
    itemA,itemB,itemC,itemD,alternativaCerta)

}catch(error){
  console.log(error)
}

    }


  return (
    <div className={styles.content}>
       <form onSubmit={handleSubmit}>
<input className={styles.nomeTest} value={nomeTeste} type='text' placeholder='Nome do teste'onChange={(e)=>setNomeTeste(e.target.value)}></input>
<input className={styles.pergunta} value={pergunta} type='text' placeholder='pergunta'onChange={(e)=>setPergunta(...pergunta,e.target.value)}></input>
<input value={itemA} type='text' placeholder='item A'onChange={(e)=>setItemA(e.target.value)}></input>
<input value={itemB}type='text' placeholder='item B'onChange={(e)=>setItemB(e.target.value)}></input>
<input value={itemC}type='text' placeholder='item C'onChange={(e)=>setItemC(e.target.value)}></input>
<input value={itemD}type='text' placeholder='item D'onChange={(e)=>setItemD(e.target.value)}></input>
<input className={styles.alternativaCerta} value={alternativaCerta}type='text' placeholder='alternativa certa'onChange={(e)=>setAlternativaCerta(e.target.value)}></input>
       <button type='submit'>Adicionar</button>
       </form>

  
      
      
    </div>
  );
}



export default CriarTeste;
