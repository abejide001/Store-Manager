import Joi from 'joi';

class Product {
  constructor() {
    this.products = [{
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
    }];
  }

  validate(sale) {
    this.schema = {
      name: Joi.string().required().min(5).max(15),
      price: Joi.number().required().min(1000),
      quantityInInventory: Joi.number().required().min(1).max(10),
    };
    return Joi.validate(sale, this.schema);
  }

  findAll() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(product => product.id === Number(id));
  }

  create(product) {
    const validated = this.validate(product);
    if (validated.error) {
      return validated;
    }
    product.id = this.products.length + 1;
    this.products.push(product);
    return product;
  }
}
export default new Product();
