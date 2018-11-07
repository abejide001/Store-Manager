import ProductModel from '../models/Product';

class Product {
  static async getAllProducts(req, res) {
    const products = await ProductModel.findAll();
    return res.status(200).json({ status: 'success', message: 'prodcuts fetched successfully', products });
  }

  static async getOneProduct(req, res) {
    const { id } = req.params;
    const product = await ProductModel.findOne(id);
    if (!product.value) {
      return res.status(404).json({ status: 'error', message: 'product not found' });
    }
    return res.status(200).json({ status: 'success', message: 'product fetched succesfully', product });
  }

  static async createProduct(req, res) {
    const newProduct = await ProductModel.create(req.body);
    if (newProduct.errors.length !== 0) {
      res.status(400).json(newProduct);
      return;
    }
    res.status(201).json({
      status: 'success',
      message: 'product created successfully',
      newProduct,
    });
  }

  static async deleteOneProduct(req, res) {
    const { id } = req.params;
    const product = await ProductModel.findOne(id);
    if (!product.value) {
      res.status(400).json({ status: 'error', message: 'product not found' });
      return;
    }
    await ProductModel.deleteOne(id);
    res.status(200).json({
      status: 'success',
      message: 'product deleted successfully',
    });
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const updatedProduct = await ProductModel.update(id, req.body);
    if (updatedProduct.errors.length !== 0) {
      if (updatedProduct.errors[0] === 'Product does not exist') {
        res.status(404).json(updatedProduct);
        return;
      }
    }
    res.status(200).json({ status: 'success', message: 'product updated', updatedProduct });
  }
}
export default Product;
