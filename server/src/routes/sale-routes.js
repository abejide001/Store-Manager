import express from 'express';
import Sale from '../controller/Sale';
import Auth from '../middleware/Auth';

const router = express.Router();

router.get('/', Auth.verifyToken, Sale.getAllSales);
router.get('/:id', Auth.verifyToken, Sale.getOneSale);
router.post('/', Auth.verifyToken, Sale.createSale);
export default router;
