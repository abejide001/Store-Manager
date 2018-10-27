import ProductModel from '../models/Product';

const Product = {
  getAllProducts(req, res) {
    const products = ProductModel.findAll();
    return res.status(200).send(products);
  },
  async getOneProduct(req, res) {
    const { id } = req.params;
    const product = await ProductModel.findOne(id);
    if (!product.value) {
      return res.status(404).send({ message: 'product not found' });
    }
    return res.send(product);
  },
  async createProduct(req, res) {
    const newProduct = await ProductModel.create(req.body);
    if (newProduct.errors.length !== 0) {
      res.status(400).send(newProduct);
      return;
    }
    res.status(201).send({
      message: 'product created',
      newProduct,
    });
  },
};
export default Product;
