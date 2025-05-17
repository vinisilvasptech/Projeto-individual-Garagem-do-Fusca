const database = require("../database/config");

function salvar(postagem) {
  const instrucao = `
    INSERT INTO postagem (url_imagem, titulo, descricao, dt_postagem, id_usuario)
    VALUES ('${postagem.url_imagem}', '${postagem.titulo}', '${postagem.descricao}', NOW(), ${postagem.id_usuario});
  `;

  return database.executar(instrucao);
}


function buscarUsuarioPeloId(id) {
  const instrucao = `select * from usuario where id = ${id}`;

  return database.executar(instrucao);
}

module.exports = { salvar, buscarUsuarioPeloId }