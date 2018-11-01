import express from 'express';
import bodyParser from 'body-parser';
import product from './src/routes/product-routes';
import sale from './src/routes/sale-routes';
import user from './src/routes/user-routes';

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/products', product);
app.use('/api/v1/sales', sale);
app.use('/api/v1/auth', user);

app.get('/api/v1', (req, res) => {
  res.status(200).send({ message: 'welcome to store manager' });
});
app.use('*', (req, res) => {
  res.status(404).send('route not found');
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`App listening on port ${port}!`);
});
export default server;
