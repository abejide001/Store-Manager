import 'babel-polyfill';
import pool from '../../db-config/database_connection';
import Validation from '../helper/sale-helper';

const Sale = {
  async findAll() {
    try {
      const result = await pool.query('SELECT * FROM sales');
      return { errors: [], value: result.rows };
    } catch (err) {
      return { errors: [err.message] };
    }
  },

  async findOne(id) {
    try {
      const result = await pool.query('SELECT * FROM sales WHERE id=$1', [id]);
      return { errors: [], value: result.rows[0] };
    } catch (err) {
      return { errors: [err.message] };
    }
  },

  async update(id, data) {
    if (data.id) {
      return { errors: ['Updating "id" is not allowed'] };
    }
    const sale = await this.findOne(id);
    if (!sale.value) {
      return { errors: ['Sale does not exist'] };
    }
    Object.assign(sale.value, data);
    const validatedSale = Validation.validate(sale.value);
    if (validatedSale.errors.length !== 0) {
      return validatedSale;
    }
    try {
      const result = await pool.query(
        'UPDATE sales SET product_name=$1, quantity_sold=$2 WHERE ID=$3 RETURNING *',
        [
          validatedSale.value.product_name,
          validatedSale.value.quantity_sold,
          validatedSale.value.id,
        ],
      );
      return { value: result.rows[0], errors: [] };
    } catch (err) {
      return { errors: [err] };
    }
  },

  async create(data) {
    const validated = Validation.validate(data);
    if (validated.errors.length !== 0) {
      return validated;
    }
    const { product_name, quantity_sold } = validated.value;
    try {
      const result = await pool.query(
        'INSERT INTO sales(product_name, quantity_sold) VALUES($1, $2, $3) RETURNING id',
        [product_name, quantity_sold],
      );
      const sale = {
        id: result.rows[0].id, product_name, quantity_sold,
      };
      validated.value = sale;
      return validated;
    } catch (err) {
      validated.errors.push(err.message);
      return validated;
    }
  },
  async deleteOne(id) {
    try {
      await pool.query('DELETE FROM sales WHERE id=$1', [id]);
      return { errors: [] };
    } catch (err) {
      return { errors: [err.message] };
    }
  },
};
export default Sale;
