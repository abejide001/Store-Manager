import express from 'express';

const app = express();

app.get('/api/v1', (req, res) => {
  res.send({ message: 'welcome to store manager' });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
