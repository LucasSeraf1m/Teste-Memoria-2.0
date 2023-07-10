const mongoose=require('mongoose')

const {Schema}=mongoose;


const cadastoSchema = new Schema(
    {
      usuario: {
        type: String,
        required: true,
      },
      senha: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  const cadastro = mongoose.model("cadastro", cadastoSchema);

  module.exports=cadastro