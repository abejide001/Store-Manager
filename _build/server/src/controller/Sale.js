'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sale = require('../models/Sale');

var _Sale2 = _interopRequireDefault(_Sale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sale = {
  getAll: function getAll(req, res) {
    var sales = _Sale2.default.findAll();
    return res.send(sales);
  },
  getOne: function getOne(req, res) {
    var id = req.params.id;

    var sale = _Sale2.default.findOne(id);
    if (!sale) {
      return res.status(404).send({ message: 'sale not found' });
    }
    return res.send(sale);
  },
  create: function create(req, res) {
    var _SaleModel$validate = _Sale2.default.validate(req.body),
        error = _SaleModel$validate.error;

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    var sale = _Sale2.default.create(req.body);
    res.status(201).send(sale);
  }
};
exports.default = Sale;