const router = require("express").Router();
const bcrypt = require("bcrypt");

// importação dos schemas 
const cadastro=require('./model/cadastrarUsuario')
const cadastroTest = require('./model/cadastroTeste')

router.post("/cadastro", async (req, res) => {
  try {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    const hashSenha = await bcrypt.hash(senha, 10);
    const post = new cadastro({
      usuario: usuario,
      senha: hashSenha,
    });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  const usuario = req.body.usuario;
  const senha = req.body.senha;

  const user = await cadastro.findOne({ usuario });

  if (!user) {
    return console.log("usuario não encontrado");
  } else {
    console.log("usuario encontrado");
  }

  const password = await bcrypt.compare(senha, user.senha);

  if (!password) {
    return res.status(401).json({ error: "Senha incorreta" });
  }

  return res.status(200).json({ message: "Login bem-sucedido" });
});

router.post("/cadastroTeste", async (req, res) => {
  try {
    const test = {
      nomeTeste: req.body.nomeTeste,
      pergunta: req.body.pergunta,
      itemA: req.body.itemA,
      itemB: req.body.itemB,
      itemC: req.body.itemC,
      itemD: req.body.itemD,
      alternativaCerta: req.body.alternativaCerta,
    };
    const post = new cadastroTest({
      teste: {
        nomeTeste: test.nomeTeste,
        pergunta: test.pergunta,
        itemA: test.itemA,
        itemB: test.itemB,
        itemC: test.itemC,
        itemD: test.itemD,
        alternativaCerta: test.alternativaCerta,
      },
    });
    await post.save();

    console.log(post);
    return res.status(201).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


module.exports = router;
