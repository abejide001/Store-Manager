'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _Sale = require('../models/Sale');

var _Sale2 = _interopRequireDefault(_Sale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(sale) {
  var schema = {
    productName: _joi2.default.string().required().min(5).max(15),
    quantitySold: _joi2.default.number().required().min(1).max(10)
  };
  return _joi2.default.validate(sale, schema);
}
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
    var _validate = validate(req.body),
        error = _validate.error;

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    var sale = _Sale2.default.create(req.body);
    res.status(201).send(sale);
  }
};
exports.default = Sale;