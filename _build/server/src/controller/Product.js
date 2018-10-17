'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _Product = require('../models/Product');

var _Product2 = _interopRequireDefault(_Product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(product) {
  var schema = {
    name: _joi2.default.string().required().min(5).max(15),
    price: _joi2.default.number().required().min(4).max(2000),
    quantityInInventory: _joi2.default.number().required().min(1).max(10)
  };
  return _joi2.default.validate(product, schema);
}
var Product = {
  getAll: function getAll(req, res) {
    var products = _Product2.default.findAll();
    return res.send(products);
  },
  getOne: function getOne(req, res) {
    var id = req.params.id;

    var product = _Product2.default.findOne(id);
    if (!product) {
      return res.status(404).send({ message: 'product not found' });
    }
    return res.send(product);
  },
  create: function create(req, res) {
    var _validate = validate(req.body),
        error = _validate.error;

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    var product = _Product2.default.create(req.body);
    res.status(201).send(product);
  }
};
exports.default = Product;