CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    price INTEGER NOT NULL,
    quantityininventory INTEGER NOT NULL
);

CREATE TABLE sales(
    id SERIAL PRIMARY KEY,
    productname VARCHAR(40) NOT NULL,
    quantitysold INTEGER NOT NULL
);
