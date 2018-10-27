import 'babel-polyfill';
import pool from '../../db-config/database_connection';
import Validation from '../helper/product-helper';

const Product = {
  async findAll() {
    try {
      const result = await pool.query('SELECT * FROM products');
      return { errors: [], value: result.rows };
    } catch (err) {
      return { errors: [err.message] };
    }
  },

  async findOne(id) {
    try {
      const result = await pool.query('SELECT * FROM products WHERE id=$1', [id]);
      return { errors: [], value: result.rows[0] };
    } catch (err) {
      return { errors: [err.message] };
    }
  },

  async create(data) {
    const validated = Validation.validate(data);
    if (validated.errors.length !== 0) {
      return validated;
    }
    const { name, price, quantity_in_inventory } = validated.value;
    try {
      const result = await pool.query(
        'INSERT INTO products(name, price, quantity_in_inventory) VALUES($1, $2, $3) RETURNING id',
        [name, price, quantity_in_inventory],
      );
      const product = {
        id: result.rows[0].id, name, price, quantity_in_inventory,
      };
      validated.value = product;
      return validated;
    } catch (err) {
      validated.errors.push(err.message);
      return validated;
    }
  },
};
export default Product;
