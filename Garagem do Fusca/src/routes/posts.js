const express = require('express');
const path = require('path');
const router = express.Router();
const upload = require('../config/configUpload');
const postsController = require('../controllers/postsController');

// Serve o formulário
router.get("", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/postagem_teste.html"));
});

// Rota de envio do formulário
router.post('/cadastro', upload.single('imagem'), (req, res) => {
  postsController.salvar(req, res);
});

module.exports = router;
