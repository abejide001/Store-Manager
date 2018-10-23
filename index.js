import express from 'express';
import bodyParser from 'body-parser';
import product from './server/src/routes/product-routes';
import sale from './server/src/routes/sale-routes';

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/products', product);
app.use('/api/v1/sales', sale);

app.get('/api/v1', (req, res) => {
  res.send({ message: 'welcome to store manager' });
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`App listening on port ${port}!`);
});
export default server;
