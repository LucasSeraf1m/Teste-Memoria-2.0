const mongoose =require("mongoose")


async function main(){
    try{
        await mongoose.connect('mongodb+srv://vinicius:lopes1234@cluster0.crxplhb.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true})
        console.log("Conexão ok")

    }
    catch(error){
        console.log(error)
    }
}

module.exports=main