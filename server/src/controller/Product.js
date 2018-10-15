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
};
export default Product;
