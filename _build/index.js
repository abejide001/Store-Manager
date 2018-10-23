'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _productRoutes = require('./server/src/routes/product-routes');

var _productRoutes2 = _interopRequireDefault(_productRoutes);

var _saleRoutes = require('./server/src/routes/sale-routes');

var _saleRoutes2 = _interopRequireDefault(_saleRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use('/api/v1/products', _productRoutes2.default);
app.use('/api/v1/sales', _saleRoutes2.default);

app.get('/api/v1', function (req, res) {
  res.send({ message: 'welcome to store manager' });
});
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  /* eslint-disable no-console */
  console.log('App listening on port ' + port + '!');
});
exports.default = server;