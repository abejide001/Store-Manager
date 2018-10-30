import 'babel-polyfill';
import pool from '../../db-config/database_connection';

const Migration = {
  async migrate() {
    /* eslint-disable no-console */
    console.log('Creating table products');
    await pool.query(`
CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    price INTEGER NOT NULL,
    quantity_in_inventory INTEGER NOT NULL
);
      `);

    console.log('Creating table sales');
    await pool.query(`

CREATE TABLE IF NOT EXISTS sales(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(40) NOT NULL,
    quantity_sold INTEGER NOT NULL
);
    `);
    console.log('Creating table users');
    await pool.query(`
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
    role VARCHAR(100) NOT NULL
);
      `);
  },
};

export default Migration;

Migration.migrate();
