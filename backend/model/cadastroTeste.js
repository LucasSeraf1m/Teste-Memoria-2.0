const mongoose = require("mongoose");

const { Schema } = mongoose;

const cadastroTesteSchema = new Schema(
  {
    testes: [
      {
        nomeTeste: {
          type: String,
          required: true,
        },
        perguntas: [
          {
            pergunta: {
              type: String,
              required: true,
            },
            itemA: {
              type: String,
              required: true,
            },
            itemB: {
              type: String,
              required: true,
            },
            itemC: {
              type: String,
              required: true,
            },
            itemD: {
              type: String,
              required: true,
            },
            alternativaCerta: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const cadastroTest = mongoose.model("testes", cadastroTesteSchema);

module.exports = cadastroTest;