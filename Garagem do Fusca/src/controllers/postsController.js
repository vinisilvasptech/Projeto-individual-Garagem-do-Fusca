const postsModel = require('../models/postsModel');

function salvar(req, res) {
  if (!req.file) {
    return res.status(400).json({ erro: "Imagem não enviada." });
  }

  const imagem = req.file.filename;
  const { titulo, descricao, fk_usuario } = req.body;

  if (!titulo || !descricao || !fk_usuario) {
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

module.exports = { salvar };
