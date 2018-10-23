import Validation from '../helper/sale-helper';

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
    const validated = Validation.validate(data);
    if (validated.errors.length !== 0) {
      return validated;
    }
    const { productName, quantitySold } = validated.value;
    const sale = {
      id: this.sales.length + 1, productName, quantitySold,
    };
    this.sales.push(sale);
    validated.value = sale;
    return validated;
  }
}
export default new Sale();
