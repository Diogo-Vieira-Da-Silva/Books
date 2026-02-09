drop database if exists livros;
CREATE DATABASE livros;
USE livros;


CREATE TABLE books(
    id VARCHAR(50) PRIMARY KEY  not null,   -- ID manual 100%
    Título VARCHAR(50) NOT NULL,
    Autor VARCHAR(50) NOT NULL,
	Status_Leitura VARCHAR(120) NOT NULL,
    Nota VARCHAR(30) NOT NULL,
    Ano_de_publicação Date NOT NULL
);



CREATE TABLE usuario(
    cpf numeric(11) PRIMARY KEY not null,   -- ID manual 100%
    nome_e_sobrenome VARCHAR(50) NOT NULL
    );
    
   