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
}
export default new Sale();
