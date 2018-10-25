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
    const newProduct = ProductModel.create(req.body);
    if (newProduct.error) {
      res.status(400).send(newProduct.error.message);
      return;
    }
    res.status(201).send(newProduct);
  },
};
export default Product;
