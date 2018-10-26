import Validation from '../helper/product-helper';

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

  findAll() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(product => product.id === Number(id));
  }

  create(data) {
    const validated = Validation.validate(data);
    if (validated.errors.length !== 0) {
      return validated;
    }
    const { name, price, quantityInInventory } = validated.value;
    const product = {
      id: this.products.length + 1, name, price, quantityInInventory,
    };
    this.products.push(product);
    validated.value = product;
    return validated;
  }
}
export default new Product();
