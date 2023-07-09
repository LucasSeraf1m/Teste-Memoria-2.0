const router=require("express").Router();
const bcrypt =require("bcrypt")
const mongoose=require("mongoose");


const {Schema}=mongoose

const cadastoSchema= new Schema({
    usuario:{
        type:String,
        required:true,
    },
    senha:{
        type:String,
        required:true,
    }
},{timestamps:true})
const cadastro=mongoose.model("cadastro",cadastoSchema)


router.post("/cadastro", async(req,res)=>{
    try{
        const usuario=req.body.usuario

        const senha =req.body.senha
        const hashSenha= await bcrypt.hash(senha,10);
        const post = new cadastro({
            usuario:usuario,
            senha:hashSenha
        })
        await post.save();
    res.status(201).send(post)
    }catch(error){
    console.error(error);
    res.status(500).send(error);
}

})

router.post("/login", async(req,res)=>{
        const usuario=req.body.usuario
        const senha =req.body.senha
        
       const user= await cadastro.findOne({usuario})



       if(!user){
       return console.log("usuario não encontrado")
       }
       else{
        console.log("usuario encontrado")

       }
       
       const password = await bcrypt.compare(senha,user.senha);


       if(!password) {
         return res.status(401).json({ error: 'Senha incorreta' });
       }
    
 


  return res.status(200).json({ message: 'Login bem-sucedido' });

})

module.exports=router;