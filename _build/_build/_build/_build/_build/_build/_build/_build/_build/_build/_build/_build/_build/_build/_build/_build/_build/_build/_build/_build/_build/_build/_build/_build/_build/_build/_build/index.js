'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

require('babel-polyfill');

var _productRoutes = require('./server/routes/product-routes');

var _productRoutes2 = _interopRequireDefault(_productRoutes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express2.default)();
app.use(_express2.default.json());
app.use('/api/v1/products', _productRoutes2.default);

app.get('/api/v1', function (req, res) {
  res.send({ message: 'welcome to store manager' });
});
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});
exports.default = server;