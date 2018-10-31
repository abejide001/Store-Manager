import SaleModel from '../models/Sale';

const Sale = {
  async getAllSales(req, res) {
    const sales = await SaleModel.findAll();
    return res.status(200).send(sales);
  },
  async createSale(req, res) {
    const newSale = await SaleModel.create(req.body);
    if (newSale.errors.length !== 0) {
      res.status(400).send(newSale);
      return;
    }
    res.status(201).send({
      message: 'sale created',
      newSale,
    });
  },
  async getOneSale(req, res) {
    const { id } = req.params;
    const sale = await SaleModel.findOne(id);
    if (!sale.value) {
      return res.status(404).send({ message: 'sale not found' });
    }
    return res.status(200).send(sale);
  },
};
export default Sale;
