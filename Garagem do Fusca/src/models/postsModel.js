const database = require("../database/config");

function salvar(postagem) {
  const instrucao = `
    INSERT INTO postagem (url_imagem, titulo, descricao, dt_postagem, fk_usuario)
    VALUES ('${postagem.url_imagem}', '${postagem.titulo}', '${postagem.descricao}', DEFAULT, ${postagem.fk_usuario});
  `;
  return database.executar(instrucao);
}

function listar() {
  const instrucao =
    `
    SELECT 
    p.id,
    p.titulo,
    p.descricao,
    p.url_imagem,
    DATE_FORMAT(p.dt_postagem, '%d/%m/%Y %H:%i') AS data_formatada,
    u.nome
    FROM postagem p
    JOIN usuario u
    ON p.fk_usuario = u.id
    ORDER BY dt_postagem;
    `;
  return database.executar(instrucao);

}

function contarPostagensTotal() {
  const instrucao = 
    `SELECT COUNT(*) AS Total_postagens FROM postagem;`;
  return database.executar(instrucao)
}

function obterEvolucaoPostagens() {
    const instrucao = `
           SELECT 
            DATE_FORMAT(dt_postagem, '%d/%m') AS data,
            COUNT(*) AS quantidade
        FROM postagem
        WHERE dt_postagem >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        GROUP BY data
        ORDER BY STR_TO_DATE(data, '%d/%m');
    `;
    return database.executar(instrucao);
}

module.exports = {
   salvar, 
   listar,
  contarPostagensTotal,
  obterEvolucaoPostagens
  };