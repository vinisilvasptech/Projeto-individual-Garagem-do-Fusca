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

function contarCurtidasTotal () {
    const instrucao = 
    `SELECT COUNT(*) AS total_curtidas FROM curtida;`;
    return database.executar(instrucao)
}

function usuarioComMaiorMediaCurtidas() {
     const instrucao = `
        SELECT 
            u.nome AS nome_usuario,
            ROUND(COUNT(c.fk_postagem_curtida) * 1.0 / COUNT(DISTINCT p.id), 2) AS media_curtidas
        FROM usuario u
        JOIN postagem p ON p.fk_usuario = u.id
        LEFT JOIN curtida c ON c.fk_postagem_curtida = p.id
        GROUP BY u.id
        HAVING COUNT(p.id) > 0
        ORDER BY media_curtidas DESC
        LIMIT 1;
    `;
    return database.executar(instrucao);
}

function mediaCurtidasPorPostagem() {
  const instrucao = `
    SELECT AVG(qtd) AS media_curtidas FROM (
      SELECT COUNT(c.fk_postagem_curtida) AS qtd
      FROM postagem p
      LEFT JOIN curtida c ON p.id = c.fk_postagem_curtida
      GROUP BY p.id
    ) AS subconsulta;
  `;
  return database.executar(instrucao);
}


module.exports = {
    verificarCurtida,
    curtir,
    descurtir,
    contarCurtidas,
    contarCurtidasTotal,
    usuarioComMaiorMediaCurtidas,
    mediaCurtidasPorPostagem
};

