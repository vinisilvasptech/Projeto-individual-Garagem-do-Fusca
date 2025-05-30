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
    p.dt_postagem,
    u.nome
    FROM postagem p
    JOIN usuario u
    ON p.fk_usuario = u.id;
    `;
  return database.executar(instrucao);

}

function contarPostagensTotal() {
  const instrucao = 
    `SELECT COUNT(*) AS Total_postagens FROM postagem;`;
  return database.executar(instrucao)
}

module.exports = {
   salvar, 
   listar,
  contarPostagensTotal
  };