const postsModel = require('../models/postsModel');

function salvar(req, res) {
  if (!req.file) {
    return res.status(400).json({ erro: "Imagem não enviada." });
  }

  const imagem = req.file.filename;
  const { titulo, descricao} = req.body;

  if (!titulo || !descricao ) {
    return res.status(400).json({ erro: "Campos obrigatórios não preenchidos." });
  }

  const postagem = {
    url_imagem: imagem,
    titulo,
    descricao,
    fk_usuario: parseInt(fk_usuario)
  };

  postsModel.salvar(postagem)
    .then(() => {
      res.status(201).send("Postagem criada com sucesso");
    })
    .catch(err => {
      console.error("Erro ao salvar postagem:", err);
      res.status(500).send("Erro ao salvar postagem");
    });
}

function listar(req, res) {
  postsModel.listar()
  .then(result => {res.json(result)})

  .catch(erro => {
    console.error("Erro ao listar postagens", erro);
    res.status(500).json({erro: "Erros ao listar postagens"})
  });
}

function contarPostagensTotal(req, res) {
  postsModel.contarPostagensTotal()
  .then(resultado => res.json(resultado[0]))
  .catch(erro => {
  console.error("Erro ao contar postagens:", erro);
  res.status(500).json({erro: "Erro ao contar postagens"});
  });
}

module.exports = { salvar, listar, contarPostagensTotal} ;
