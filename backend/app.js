const express=require("express");
const bodyParser = require("body-parser")

const app=express();
const cors =require('cors')
const PORTA=1000;
const router=require("./rotas")

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

const conn=require("./bd/conn")
conn()




app.use('/api',router)

app.listen(PORTA,()=>{
    console.log(`Aplicaçao rodando na porta: http://localhost:${PORTA} `)
})