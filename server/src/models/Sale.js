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

  create(data) {
    const { productName, quantitySold } = data;
    const newSale = {
      id: this.sales.length + 1, productName, quantitySold,
    };
    this.sales.push(newSale);
    return newSale;
  }
}
export default new Sale();
