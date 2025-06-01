var curtidasModel = require('../models/curtidasModel');

// Função para curtir/descurtir
function alternarCurtida(req, res) {
    var idUsuario = req.body.idUsuario;
    var idPostagem = req.body.idPostagem;

    if (!idUsuario || !idPostagem) {
        return res.status(400).json({ mensagem: "ID da postagem ou do usuário não identificado" });
    }

    curtidasModel.verificarCurtida(idUsuario, idPostagem)
        .then(resultado => {
            if (resultado.length > 0) {
                // Já curtiu → descurtir
                return curtidasModel.descurtir(idUsuario, idPostagem)
                    .then(() => res.sendStatus(200));
            } else {
                // Ainda não curtiu → curtir
                return curtidasModel.curtir(idUsuario, idPostagem)
                    .then(() => res.sendStatus(200));
            }
        })
        .catch(erro => {
            console.error("Erro ao alternar curtida:", erro);
            res.status(500).json({ erro: "Erro interno ao processar curtida." });
        });
}

// Função para fazer a contagem de curtidas em um determinado post
function contar(req, res) {
    var idPostagem = req.params.idPostagem;
    
    if (!idPostagem) {
        return res.status(400).json({ mensagem: "ID da postagem ausente!" });
    }

    curtidasModel.contarCurtidas(idPostagem) 
        .then(resultado => {
            res.status(200).json(resultado[0]); // Ex: { qtd: 5 }
        })
        .catch(erro => {
            console.error("Erro ao contar curtidas:", erro);
            res.status(500).json({ erro: "Erro interno ao contar curtidas." });
        });
}

function contarCurtidasTotal(req, res) {
    curtidasModel.contarCurtidasTotal()
    .then(resultado => res.json(resultado[0]));
}

function usuarioComMaiorMediaCurtidas(req, res) {
    curtidasModel.usuarioComMaiorMediaCurtidas()
    .then(resultado => res.json(resultado[0]));
}

function mediaCurtidasPorPostagem(req, res) {
    curtidasModel.mediaCurtidasPorPostagem()
    .then(resultado => res.json(resultado[0]));
}

module.exports = {
    alternarCurtida,
    contar,
    contarCurtidasTotal,
    usuarioComMaiorMediaCurtidas,
    mediaCurtidasPorPostagem
};
