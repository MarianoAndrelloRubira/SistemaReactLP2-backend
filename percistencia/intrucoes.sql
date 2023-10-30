CREATE DATABASE sistema;

USE sistema:

CREATE TABLE categoria(
    cat_codCat INT NOT NULL AUTO_INCREMENT,
    cat_desCat VARCHAR(100) NOT NULL

    CONSTRAINT pk_categoria PRIMARY KEY(cat_codCat) 
);

CREATE TABLE produto(
    prod_cod INT NOT NULL AUTO_INCREMENT,
    prod_marca VARCHAR(100) NOT NULL,
    prod_nomeProd VARCHAR(100) NOT NULL,
    prod_precInd DECIMAL(10,2) NOT NULL,
    prod_qtd INT NOT NULL,
    prod_precLot DECIMAL(10,2) NOT NULL,
    prod_precVenda DECIMAL(10,2) NOT NULL,
    cat_codCat INT NOT NULL,
    prod_data DATE NOT NULL

    CONSTRAINT pk_produto PRIMARY KEY(prod_cod),
    CONSTRAINT fk_categoria FOREIGN KEY(cat_codCat) REFERENCES categoria(cat_codCat)
)