// Importa a conexão com o banco de dados
var database = require("../database/config")

// Verifica se o usuário já curtiu aquele post

function verificarCurtida(idUsuario, idPostagem) {
    const instrucao = 
    `
    SELECT * FROM curtida
    WHERE fk_usuario_curtida = ${idUsuario} 
    AND fk_postagem_curtida = ${idPostagem};
    `;

    return database.executar(instrucao);
}

// Função para curtir os posts 

function curtir(idUsuario, idPostagem) {
    const instrucao = 
    `
    INSERT INTO curtida (fk_usuario_curtida, fk_postagem_curtida) VALUES
        (${idUsuario}, ${idPostagem});
    `;

    return database.executar(instrucao);
}

// Função para descurtir os posts 

function descurtir(idUsuario, idPostagem) {
    const instrucao = 
    `
    DELETE FROM curtida 
     WHERE fk_usuario_curtida = ${idUsuario} 
    AND fk_postagem_curtida = ${idPostagem};
    `;

    return database.executar(instrucao);
}

//Função para contar todas as curitdas daquela post
function contarCurtidas(idUsuario) {
    const instrucao = `
        SELECT COUNT(*) AS qtd FROM curtida
        WHERE fk_postagem_curtida = ${idUsuario};
    `;
    return database.executar(instrucao);
}


module.exports = {
    verificarCurtida,
    curtir,
    descurtir,
    contarCurtidas
};

