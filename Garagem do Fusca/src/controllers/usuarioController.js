var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);


                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function totalUsuarios(req, res) {
    usuarioModel.totalUsuarios()
        .then(resultado => res.json(resultado[0]))
        .catch(erro => {
            console.log("Erro ao buscar total de usuários:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function usuariosAtivos(req, res) {
    usuarioModel.usuariosAtivos()
        .then(resultado => res.json(resultado[0]))
        .catch(erro => {
            console.log("Erro ao buscar usuários ativos:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function totaisPostagensCurtidas(req, res) {
    usuarioModel.totalPostagensCurtidas()
        .then(resultado => res.json(resultado[0]))
        .catch(erro => {
            console.log("Erro ao buscar totais de postagens e curtidas:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarUsuarios(req, res) {
    usuarioModel.listarUsuarios()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro ao listar usuários:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    autenticar,
    cadastrar,
    totalUsuarios,
    usuariosAtivos,
    totaisPostagensCurtidas,
    listarUsuarios
};
