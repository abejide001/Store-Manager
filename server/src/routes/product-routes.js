import express from 'express';
import Product from '../controller/Product';

const router = express.Router();
router.get('/', Product.getAllProducts);
router.get('/:id', Product.getOneProduct);
router.put('/:id', Product.updateProduct);
router.post('/', Product.createProduct);

export default router;
