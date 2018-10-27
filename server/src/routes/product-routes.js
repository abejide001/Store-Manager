import express from 'express';
import Product from '../controller/Product';

const router = express.Router();
router.get('/', Product.getAllProducts);
router.get('/:id', Product.getOneProduct);
router.post('/', Product.createProduct);
router.delete('/:id', Product.deleteOneProduct);

export default router;
