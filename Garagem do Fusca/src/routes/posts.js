const express = require('express');
const path = require('path');
const router = express.Router();
const upload = require('../config/configUpload');
const postsController = require('../controllers/postsController');

router.get('/listar', postsController.listar);

// Serve o formulário
router.get("", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/comunidade.html"));
});

// Rota de envio do formulário
router.post('/cadastro', upload.single('imagem'), (req, res) => {
  postsController.salvar(req, res);
});

router.get('/total', postsController.contarPostagensTotal);


router.get('/evolucao', postsController.obterEvolucaoPostagens);

module.exports = router;
