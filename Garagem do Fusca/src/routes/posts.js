const express = require('express');
const router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD
const postcontroler = require('../controllers/postcontroler');

router.get("", (req, res) => {
  res.render("index")
});

// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
router.post('/cadastro', upload.single('foto'), (req, res) => {
  postcontroler.salvar(req, res);
});

router.get('/:id', upload.single('foto'), (req, res) => {
  postcontroler.buscarUsuarioPeloId(req, res);
});

module.exports = router;

