CREATE DATABASE store;

CREATE TABLE categories(
	category_id SERIAL PRIMARY KEY ,
	category VARCHAR(40)
)

CREATE TABLE products(
    product_id SERIAL PRIMARY KEY ,
    name VARCHAR(40) ,
    cost INT,
	quantity INT,
	category_id INT ,
	FOREIGN KEY (category_id) REFERENCES categories(category_id)
)

create table car(
	car_id SERIAL PRIMARY KEY,
	product_id INT,
	quantity INT,
	FOREIGN KEY (product_id) REFERENCES products(product_id)
)

INSERT INTO categories (category) values ('ELECTRONICA');
INSERT INTO categories (category) values ('ROPA');
INSERT INTO categories (category) values ('COCINA');


INSERT INTO products (name,cost,category_id,quantity) values ('Apple tv', 1800,1,40);
INSERT INTO products (name,cost,category_id,quantity) values ('Smart tv', 8000,1,30);
INSERT INTO products (name,cost,category_id,quantity) values ('Motorola celular', 2000,1,40);

INSERT INTO products (name,cost,category_id,quantity) values ('Short', 300,2,40);
INSERT INTO products (name,cost,category_id,quantity) values ('Playera polo', 500,2,30);
INSERT INTO products (name,cost,category_id,quantity) values ('Boxer', 100,2,40);