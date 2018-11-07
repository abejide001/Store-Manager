import SaleModel from '../models/Sale';

class Sale {
  static async getAllSales(req, res) {
    const sales = await SaleModel.findAll();
    return res.status(200).json({ status: 'success', message: 'fetched all sales', sales });
  }

  static async createSale(req, res) {
    const newSale = await SaleModel.create(req.body);
    if (newSale.errors.length !== 0) {
      res.status(400).json(newSale);
      return;
    }
    res.status(201).json({
      status: 'success',
      message: 'sale created',
      newSale,
    });
  }

  static async getOneSale(req, res) {
    const { id } = req.params;
    const sale = await SaleModel.findOne(id);
    if (!sale.value) {
      return res.status(404).json({ status: 'error', message: 'sale not found' });
    }
    return res.status(200).json({ status: 'success', message: 'sale fetched successfully', sale });
  }
}
export default Sale;
