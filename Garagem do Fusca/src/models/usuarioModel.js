var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function totalUsuarios() {
    var instrucao =
        `SELECT COUNT(*) AS total FROM usuario;`;
    return database.executar(instrucao);
}

function usuariosAtivos() {
    var instrucao =
    `
    SELECT COUNT(DISTINCT fk_usuario_curtida) AS total_ativos_7dias
    FROM curtida
    WHERE dt_curtida >= DATE_SUB(NOW(), INTERVAL 7 DAY);
    `
    return database.executar(instrucao);
}

function totalPostagensCurtidas() {
    var instrucao = 
    `
    SELECT 
        (SELECT COUNT(*) FROM postagem) AS total_postagens,
        (SELECT COUNT(*) FROM curtida) AS total_curtidas,
        (SELECT COUNT(*) FROM usuario) AS total_usuarios;
    `
    return database.executar(instrucao);
}

function listarUsuarios() {
    const instrucao = `SELECT id, nome, email FROM usuario;`;
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar,
    totalUsuarios,
    usuariosAtivos,
    totalPostagensCurtidas,
    listarUsuarios
};