drop database if exists livros;
CREATE DATABASE livros;
USE livros;


CREATE TABLE books(
    id VARCHAR(50) PRIMARY KEY  not null,   -- ID manual 100%
    Título VARCHAR(50) NOT NULL,
    Autor VARCHAR(50) NOT NULL,
    gênero varchar(50) not null,
	Status_Leitura ENUM("Lendo", "Ainda não li", "Finalizado") NOT NULL,
    Nota ENUM ("0 ESTRELAS", "1 ESTRELA", "2 ESTRELAS", "3 ESTRELAS", "4 ESTRELAS", "5 ESTRELAS")  Not null,
    Complemento_Nota varchar(50), 
    Ano_de_publicação Date NOT NULL
);



CREATE TABLE usuario(
    cpf numeric(11) PRIMARY KEY not null,   -- ID manual 100%
    nome_e_sobrenome VARCHAR(50) NOT NULL
    );
   