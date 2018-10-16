import Joi from 'joi';
import SaleModel from '../models/Sale';

function validate(sale) {
  const schema = {
    productName: Joi.string().required().min(5).max(15),
    quantitySold: Joi.number().required().min(1).max(10),
  };
  return Joi.validate(sale, schema);
}
const Sale = {
  getAll(req, res) {
    const sales = SaleModel.findAll();
    return res.send(sales);
  },
  getOne(req, res) {
    const { id } = req.params;
    const sale = SaleModel.findOne(id);
    if (!sale) {
      return res.status(404).send({ message: 'sale not found' });
    }
    return res.send(sale);
  },
  create(req, res) {
    const { error } = validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const sale = SaleModel.create(req.body);
    res.status(201).send(sale);
  },
};
export default Sale;
