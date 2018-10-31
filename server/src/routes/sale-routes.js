import express from 'express';
import Sale from '../controller/Sale';
import Auth from '../../db-config/database_connection';

const router = express.Router();

router.get('/', Auth.verfifyToken, Sale.getAllSales);
router.get('/:id', Auth.verfifyToken, Sale.getOneSale);
router.post('/', Auth.verfifyToken, Sale.createSale);
export default router;
