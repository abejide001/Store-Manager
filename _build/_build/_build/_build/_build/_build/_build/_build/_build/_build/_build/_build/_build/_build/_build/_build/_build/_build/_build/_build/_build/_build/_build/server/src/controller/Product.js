'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Product = require('../models/Product');

var _Product2 = _interopRequireDefault(_Product);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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
      return res.status(400).send({ message: 'product not found' });
    }
    return res.send(product);
  }
};
exports.default = Product;