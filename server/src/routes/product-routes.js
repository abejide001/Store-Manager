import express from 'express';
import Product from '../controller/Product';
import Auth from '../middleware/Auth';

const router = express.Router();
router.get('/', Auth.verifyToken, Product.getAllProducts);
router.get('/:id', Auth.verifyToken, Product.getOneProduct);
router.post('/', Product.createProduct);
router.delete('/:id', Product.deleteOneProduct);
router.put('/:id', Product.updateProduct);

export default router;
