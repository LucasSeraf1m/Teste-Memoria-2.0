const mongoose = require("mongoose");

const { Schema } = mongoose;

const testeRealizadoSchema = new Schema(
  {
    nomeTeste: {
      type: String,
      required: true,
    },
    qtd_perguntas: {
      type: Number,
      required: true,
    },
    qtd_acertos: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const TesteRealizado = mongoose.model("TesteRealizado", testeRealizadoSchema);

module.exports = TesteRealizado;