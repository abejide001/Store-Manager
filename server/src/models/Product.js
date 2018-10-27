import 'babel-polyfill';
import pool from '../../db-config/database_connection';
import Validation from '../helper/product-helper';

const Product = {
  products() {
    return [{
      id: 1,
      name: 'air max',
      price: 1000,
      quantityInInventory: 2,
    },
      {
        id: 2,
        name: 'nike air',
        price: 1000,
        quantityInInventory: 3,
      }]
  },

  async findAll() {
    try {
      const result = await pool.query('SELECT * products');
      return { errors: [], value: result.rows };
    } catch (err) {
      return { errors: [err.message] };
    }
  },

  findOne(id) {
    return this.products().find(product => product.id === Number(id));
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
