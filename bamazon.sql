DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

use bamazon_db;

CREATE TABLE products (
	ITEM_ID INT NOT NULL AUTO_INCREMENT,
	PRODUCT_NAME VARCHAR(75) NOT NULL,
	DEPARTMENT_NAME VARCHAR(75) NOT NULL,
	PRICE INT NOT NULL,
	STOCK_QUANTITY INT,
	PRIMARY KEY (ITEM_ID)
);

INSERT INTO products (PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY)
VALUES 
("Gaming Monitor", "Electronics", 239.99, 852),
("Glass Coffee Table", "Home", 120.00, 75),
("Knitting Needles", "Crafts", 9.00, 800),
("Settlers of Catan", "Games", 99.99, 1253),
("Patrick Mahomes Bobble Head", "Toys", 14.99, 4599),
("Antique Book", "Books", 320.00, 4),
("eReader", "Electronics", 149.00, 13945),
("Painting Starter Kit", "Crafts", 49.99, 765),
("Bed Sheets", "Home", 145.00, 432),
("Croquet Set", "Games", 40.00, 120)
