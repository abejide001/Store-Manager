import express from 'express';
import Product from '../controller/Product';
import Auth from '../middleware/Auth';

const router = express.Router();
router.get('/', Auth.verifyToken, Product.getAllProducts);
router.get('/:id', Auth.verifyToken, Product.getOneProduct);
router.post('/', Auth.verifyToken, Auth.verifyAdmin, Product.createProduct);
router.delete('/:id', Auth.verifyToken, Auth.verifyAdmin, Product.deleteOneProduct);
router.put('/:id', Auth.verifyToken, Auth.verifyAdmin, Product.updateProduct);

export default router;
