'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Product = require('../models/Product');

var _Product2 = _interopRequireDefault(_Product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Product = {
  getAllProducts: function getAllProducts(req, res) {
    var products = _Product2.default.findAll();
    return res.status(200).send(products);
  },
  getOneProduct: function getOneProduct(req, res) {
    var id = req.params.id;

    var product = _Product2.default.findOne(id);
    if (!product) {
      return res.status(404).send({ message: 'product not found' });
    }
    return res.send(product);
  },
  createProducts: function createProducts(req, res) {
    var newProduct = _Product2.default.create(req.body);
    if (newProduct.errors.length !== 0) {
      res.status(400).send(newProduct);
      return;
    }
    res.status(201).send({
      message: 'product created',
      newProduct: newProduct
    });
  }
};
exports.default = Product;