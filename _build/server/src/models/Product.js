'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productHelper = require('../helper/product-helper');

var _productHelper2 = _interopRequireDefault(_productHelper);

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
    value: function create(data) {
      var validated = _productHelper2.default.validate(data);
      if (validated.errors.length !== 0) {
        return validated;
      }
      var _validated$value = validated.value,
          name = _validated$value.name,
          price = _validated$value.price,
          quantityInInventory = _validated$value.quantityInInventory;

      var product = {
        id: this.products.length + 1, name: name, price: price, quantityInInventory: quantityInInventory
      };
      this.products.push(product);
      validated.value = product;
      return validated;
    }
  }]);

  return Product;
}();

exports.default = new Product();