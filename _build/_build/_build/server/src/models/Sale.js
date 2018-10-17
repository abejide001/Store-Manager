'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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