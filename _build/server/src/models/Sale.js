'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

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
    key: 'validate',
    value: function validate(sale) {
      this.schema = {
        productName: _joi2.default.string().required().min(5).max(15),
        quantitySold: _joi2.default.number().required().min(1).max(10)
      };
      return _joi2.default.validate(sale, this.schema);
    }
  }, {
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
      var productName = data.productName,
          quantitySold = data.quantitySold;

      var newSale = {
        id: this.sales.length + 1, productName: productName, quantitySold: quantitySold
      };
      this.sales.push(newSale);
      return newSale;
    }
  }]);

  return Sale;
}();

exports.default = new Sale();