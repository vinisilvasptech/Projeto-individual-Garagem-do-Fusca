-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE garagem_do_fusca;

USE garagem_do_fusca;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (30) NOT NULL,
    email VARCHAR (100) NOT NULL,
    senha VARCHAR (30) NOT NULL
);

CREATE TABLE postagem(
	id INT PRIMARY KEY AUTO_INCREMENT,
    url_imagem VARCHAR(250) NOT NULL,
    titulo VARCHAR (50) NOT NULL,
    descricao VARCHAR (250) NOT NULL,
    dt_postagem DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_usuario INT,
    CONSTRAINT fkuser
		FOREIGN KEY (fk_usuario)
			REFERENCES usuario(id)
);

CREATE TABLE curtida (
	id INT,
    fk_usuario_curtida INT,
    fk_postagem_curtida INT,
    CONSTRAINT pks
	PRIMARY KEY (id, fk_usuario_curtida, fk_postagem_curtida),
    CONSTRAINT fks_curtidas
		FOREIGN KEY (fk_usuario_curtida)
			REFERENCES usuario(id),
		FOREIGN KEY (fk_postagem_curtida)
			REFERENCES postagem(id),
	dt_curtida DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comentario (
	id INT,
    fk_usuario_comentario INT,
    fk_postagem_comentario INT,
    CONSTRAINT pks
	PRIMARY KEY (id, fk_usuario_comentario, fk_postagem_comentario),
	CONSTRAINT fks_comentarios
		FOREIGN KEY (fk_usuario_comentario)
			REFERENCES usuario(id),
		FOREIGN KEY (fk_postagem_comentario)
			REFERENCES postagem(id),
    comentario VARCHAR (250) NOT NULL,
	dt_comentario DATETIME DEFAULT CURRENT_TIMESTAMP
);  


