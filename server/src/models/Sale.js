class Sale {
  constructor() {
    this.sales = [{
      id: 1,
      productName: 'air max',
      quantitySold: 12,
    }];
  }

  findAll() {
    return this.sales;
  }

  findOne(id) {
    return this.sales.find(sale => sale.id === Number(id));
  }
}
export default new Sale();
