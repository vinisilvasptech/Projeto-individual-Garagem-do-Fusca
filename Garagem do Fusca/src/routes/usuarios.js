var express = require("express");
var router = express.Router(); 
var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/total-usuarios", usuarioController.totalUsuarios);
router.get("/usuarios-ativos", usuarioController.usuariosAtivos);
router.get("/totais-postagens-curtidas", usuarioController.totaisPostagensCurtidas);

router.get("/listar", (req, res) => {
    usuarioController.listarUsuarios(req, res);
});


module.exports = router;