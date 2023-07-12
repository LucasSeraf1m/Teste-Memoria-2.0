const router = require("express").Router();
const bcrypt = require("bcrypt");

// importação dos schemas
const cadastro = require("./model/cadastrarUsuario");
const cadastroTest = require("./model/cadastroTeste");
const TesteRealizado = require("./model/testeRealizado");

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
    const { testes } = req.body;

    const post = new cadastroTest({ testes });
    await post.save();

    console.log(post);
    return res.status(201).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/testes', async (req, res) => {
  try {
    const testes = await cadastroTest.find(); // Buscar todos os documentos da coleção de testes
    res.status(200).json(testes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar os testes.' });
  }
});

router.put("/cadastroTeste/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const testeAtualizado = req.body;

    // Encontra e atualiza o teste pelo ID
    const updatedTeste = await cadastroTest.findOneAndUpdate(
      { _id: id },
      testeAtualizado,
      { new: true }
    );

    res.json(updatedTeste);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao atualizar o teste." });
  }
});

router.post('/testeRealizado', async (req, res) => {
  try {
    const { teste, qtd_perguntas, qtd_acertos } = req.body;

    const testeRealizado = new TesteRealizado({
      nomeTeste: teste,
      qtd_perguntas,
      qtd_acertos,
    });

    const savedTesteRealizado = await testeRealizado.save();
    res.status(201).json(savedTesteRealizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar o teste realizado.' });
  }
});

router.get("/testesRealizados", async (req, res) => {
  try {
    const testesRealizados = await TesteRealizado.find().sort({
      qtd_perguntas: -1,
      qtd_acertos: -1,
    });
    res.status(200).json(testesRealizados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar os testes realizados." });
  }
});

module.exports = router;