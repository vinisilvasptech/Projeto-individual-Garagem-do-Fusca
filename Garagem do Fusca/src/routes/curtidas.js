var express = require('express');
var router = express.Router();
var curtidasController = require('../controllers/curtidasController');

//Rota para curtir/descurtir um post (Post)
router.post('/alternar', function(req, res) {
    curtidasController.alternarCurtida(req, res);
});

// Rota para contar as curtidas de uma postagem (GET)
router.get('/contar/:idPostagem', function(req, res) {
    curtidasController.contar(req, res);
});

router.get('/total', curtidasController.contarCurtidasTotal);

router.get('/maior_media', curtidasController.usuarioComMaiorMediaCurtidas);

router.get('/media_curtidas_postagens', curtidasController.mediaCurtidasPorPostagem);

router.get("/curtidasPorDia", curtidasController.obterCurtidasPorDia);

module.exports = router;