import ProductModel from '../models/Product';

class Product {
  static async getAllProducts(req, res) {
    const products = await ProductModel.findAll();
    return res.status(200).json(products);
  }

  static async getOneProduct(req, res) {
    const { id } = req.params;
    const product = await ProductModel.findOne(id);
    if (!product.value) {
      return res.status(404).json({ message: 'product not found' });
    }
    return res.send(product);
  }

  static async createProduct(req, res) {
    const newProduct = await ProductModel.create(req.body);
    if (newProduct.errors.length !== 0) {
      res.status(400).json(newProduct);
      return;
    }
    res.status(201).send({
      success: true,
      message: 'product created',
      newProduct,
    });
  }

  static async deleteOneProduct(req, res) {
    const { id } = req.params;
    await ProductModel.deleteOne(id);
    res.status(200).json({
      message: 'deleted',
    });
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const updatedProduct = await ProductModel.update(id, req.body);
    if (updatedProduct.errors.length !== 0) {
      if (updatedProduct.errors[0] === 'Product does not exist') {
        res.status(404).send(updatedProduct);
        return;
      }
      res.status(400).send(updatedProduct);
      return;
    }
    res.status(200).send(updatedProduct);
  }
}
export default Product;
