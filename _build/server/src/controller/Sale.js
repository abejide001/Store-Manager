'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sale = require('../models/Sale');

var _Sale2 = _interopRequireDefault(_Sale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sale = {
  getAllSales: function getAllSales(req, res) {
    var sales = _Sale2.default.findAll();
    return res.status(200).send(sales);
  },
  getOneSale: function getOneSale(req, res) {
    var id = req.params.id;

    var sale = _Sale2.default.findOne(id);
    if (!sale) {
      return res.status(404).send({ message: 'sale not found' });
    }
    return res.send(sale);
  },
  createSales: function createSales(req, res) {
    var newSale = _Sale2.default.create(req.body);
    if (newSale.errors.length !== 0) {
      res.status(400).send(newSale);
      return;
    }
    res.status(201).send({
      message: 'sale created',
      newSale: newSale
    });
  }
};
exports.default = Sale;