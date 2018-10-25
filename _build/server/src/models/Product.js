'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = function () {
  function Product() {
    _classCallCheck(this, Product);

    this.products = [{
      id: 1,
      name: 'air max',
      price: 1000,
      quantityInInventory: 2
    }, {
      id: 2,
      name: 'nike air',
      price: 1000,
      quantityInInventory: 3
    }];
  }

  _createClass(Product, [{
    key: 'validate',
    value: function validate(sale) {
      this.schema = {
        name: _joi2.default.string().required().min(5).max(15),
        price: _joi2.default.number().required().min(1000),
        quantityInInventory: _joi2.default.number().required().min(1).max(10)
      };
      return _joi2.default.validate(sale, this.schema);
    }
  }, {
    key: 'findAll',
    value: function findAll() {
      return this.products;
    }
  }, {
    key: 'findOne',
    value: function findOne(id) {
      return this.products.find(function (product) {
        return product.id === Number(id);
      });
    }
  }, {
    key: 'create',
    value: function create(product) {
      var validated = this.validate(product);
      if (validated.error) {
        return validated;
      }
      product.id = this.products.length + 1;
      this.products.push(product);
      return product;
    }
  }]);

  return Product;
}();

exports.default = new Product();