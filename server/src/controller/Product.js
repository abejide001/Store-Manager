import Joi from 'joi';
import ProductModel from '../models/Product';

function validate(product) {
  const schema = {
    name: Joi.string().required().min(5).max(15),
    price: Joi.number().required().min(4).max(2000),
    quantityInInventory: Joi.number().required().min(1).max(10),
  };
  return Joi.validate(product, schema);
}
const Product = {
  getAll(req, res) {
    const products = ProductModel.findAll();
    return res.send(products);
  },
  getOne(req, res) {
    const { id } = req.params;
    const product = ProductModel.findOne(id);
    if (!product) {
      return res.status(404).send({ message: 'product not found' });
    }
    return res.send(product);
  },
  create(req, res) {
    const { error } = validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const product = ProductModel.create(req.body);
    res.status(201).send(product);
  },
};
export default Product;
