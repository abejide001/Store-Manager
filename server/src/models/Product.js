class Product {
  constructor() {
    this.products = [{
      id: 1,
      name: 'air max',
      price: 10000,
      quantityInInventory: 2,
    },
    {
      id: 2,
      name: 'nike air',
      price: 10000,
      quantityInInventory: 3,
    }];
  }

  findAll() {
    return this.products;
  }
}
export default new Product();
