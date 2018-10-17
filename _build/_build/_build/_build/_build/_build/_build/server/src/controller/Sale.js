'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sale = require('../models/Sale');

var _Sale2 = _interopRequireDefault(_Sale);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Sale = {
  getAll: function getAll(req, res) {
    var sales = _Sale2.default.findAll();
    return res.send(sales);
  }
};
exports.default = Sale;