import Joi from 'joi';

class Sale {
  constructor() {
    this.sales = [{
      id: 1,
      productName: 'air max',
      quantitySold: 12,
    }];
  }

  validate(sale) {
    this.schema = {
      productName: Joi.string().required().min(5).max(15),
      quantitySold: Joi.number().required().min(1).max(10),
    };
    return Joi.validate(sale, this.schema);
  }

  findAll() {
    return this.sales;
  }

  findOne(id) {
    return this.sales.find(sale => sale.id === Number(id));
  }

  create(sale) {
    const validated = this.validate(sale);
    if (validated.error) {
      return validated;
    }
    sale.id = this.sales.length + 1;
    this.sales.push(sale);
    return sale;
  }
}
export default new Sale();
