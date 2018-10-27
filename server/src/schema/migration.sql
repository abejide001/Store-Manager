CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    price INTEGER NOT NULL,
    quantity_in_inventory INTEGER NOT NULL
);

CREATE TABLE sales(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(40) NOT NULL,
    quantity_sold INTEGER NOT NULL
);
