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
  }
};
exports.default = Product;