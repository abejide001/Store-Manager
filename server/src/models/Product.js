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

  async update(id, data) {
    if (data.id) {
      return { errors: ['Updating "id" is not allowed'] };
    }
    const product = await this.findOne(id);
    if (!product.value) {
      return { errors: ['Product does not exist'] };
    }
    Object.assign(product.value, data);
    const validatedProduct = Validation.validate(product.value);
    if (validatedProduct.errors.length !== 0) {
      return validatedProduct;
    }
    try {
      const result = await pool.query(
        'UPDATE products SET name=$1, price=$2, quantity_in_inventory=$3, product_image=$4 WHERE ID=$5 RETURNING *',
        [
          validatedProduct.value.name,
          validatedProduct.value.price,
          validatedProduct.value.quantity_in_inventory,
          validatedProduct.value.product_image,
          validatedProduct.value.id,
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
    const {
      name, price, quantity_in_inventory, product_image,
    } = validated.value;
    try {
      const result = await pool.query(
        'INSERT INTO products(name, price, quantity_in_inventory, product_image) VALUES($1, $2, $3, $4) RETURNING id',
        [name, price, quantity_in_inventory, product_image],
      );
      const product = {
        id: result.rows[0].id, name, price, quantity_in_inventory, product_image,
      };
      validated.value = product;
      return validated;
    } catch (err) {
      validated.errors.push(err.message);
      return validated;
    }
  },
  async deleteOne(id) {
    try {
      await pool.query('DELETE FROM products WHERE id=$1', [id]);
      return { errors: [] };
    } catch (err) {
      return { errors: [err.message] };
    }
  },
};
export default Product;
