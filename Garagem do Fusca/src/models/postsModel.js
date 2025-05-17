const database = require("../database/config");

function salvar(postagem) {
  const instrucao = `
    INSERT INTO postagem (url_imagem, titulo, descricao, dt_postagem, fk_usuario)
    VALUES ('${postagem.url_imagem}', '${postagem.titulo}', '${postagem.descricao}', DEFAULT, ${postagem.fk_usuario});
  `;

  return database.executar(instrucao);
}

module.exports = { salvar}