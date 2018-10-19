import ProductModel from '../models/Product';

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
    const { error } = ProductModel.validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const product = ProductModel.create(req.body);
    res.status(201).send(product);
  },
};
export default Product;
