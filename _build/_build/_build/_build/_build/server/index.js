'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express2.default)();

app.get('/api/v1', function (req, res) {
  res.send({ message: 'welcome to store manager' });
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});