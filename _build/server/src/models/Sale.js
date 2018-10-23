'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _saleHelper = require('../helper/sale-helper');

var _saleHelper2 = _interopRequireDefault(_saleHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sale = function () {
  function Sale() {
    _classCallCheck(this, Sale);

    this.sales = [{
      id: 1,
      productName: 'air max',
      quantitySold: 12
    }];
  }

  _createClass(Sale, [{
    key: 'findAll',
    value: function findAll() {
      return this.sales;
    }
  }, {
    key: 'findOne',
    value: function findOne(id) {
      return this.sales.find(function (sale) {
        return sale.id === Number(id);
      });
    }
  }, {
    key: 'create',
    value: function create(data) {
      var validated = _saleHelper2.default.validate(data);
      if (validated.errors.length !== 0) {
        return validated;
      }
      var _validated$value = validated.value,
          productName = _validated$value.productName,
          quantitySold = _validated$value.quantitySold;

      var sale = {
        id: this.sales.length + 1, productName: productName, quantitySold: quantitySold
      };
      this.sales.push(sale);
      validated.value = sale;
      return validated;
    }
  }]);

  return Sale;
}();

exports.default = new Sale();