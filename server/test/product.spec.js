import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import ProductModel from '../src/models/Product';

chai.use(chaiHttp);
const should = chai.should(); // eslint-disable-line
const { expect } = chai;
describe('GET /products', () => {
  it('should return 400, if no token is provided', (done) => {
    chai.request(server)
      .get('/api/v1/products')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
describe('PUT /products/:id', () => {
  it('should return 400 if no token', (done) => {
    (async () => {
      const product = await ProductModel.create(
        {
          name: 'fila jordan', price: 50000, quantity_in_inventory: 3, product_image: 'https://i.imgur.com/V0qHM1d.jpg',
        },
      );
      chai.request(server)
        .put(`/api/v1/products/${product.value.id}`)
        .send({
          name: 'fila fubu', price: 55000, quantity_in_inventory: 5, product_image: 'https://i.imgur.com/V0qHM1d.jpg',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(err);
        });
    })();
  });

  it('should return a 400 if update is invalid', (done) => {
    (async () => {
      const product = await ProductModel.create(
        {
          name: 'fila jordan', price: 50000, quantity_in_inventory: 3, product_image: 'https://i.imgur.com/V0qHM1d.jpg',
        },
      );
      chai.request(server)
        .put(`/api/v1/products/${product.value.id}`)
        .send({
          name: 'fila', price: 0, quantity_in_inventory: 0, product_image: 'https://i.imgur.com/V0qHM1d.jpg',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(err);
        });
    })();
  });
});
describe('GET /products/:id', () => {
  it('should return 400 if no token', (done) => {
    (async () => {
      await ProductModel.create(
        {
          name: 'some shoe', price: 50000, quantity_in_inventory: 3, product_image: 'https://i.imgur.com/V0qHM1d.jpg',
        },
      );
      const persistedProducts = await ProductModel.findAll();
      const count = persistedProducts.value.length - 1;
      const id = persistedProducts.value[count].id + 100;
      chai.request(server)
        .get(`/api/v1/products/${id}`)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.message).to.equal('Token is not provided');
          expect(res.body).to.not.be.empty;
          done(err);
        });
    })();
  });
  it('should return 400, if no token', (done) => {
    (async () => {
      await ProductModel.create(
        {
          name: 'fila jordan', price: 50000, quantity_in_inventory: 3, product_image: 'https://i.imgur.com/V0qHM1d.jpg',
        },
      );
      chai.request(server)
        .get('/api/v1/products/1')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.exist;
          done(err);
        });
    })();
  });
});
describe('POST /products', () => {
  it('should return 400 if no token is passed', (done) => {
    chai.request(server)
      .post('/api/v1/products')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  });
  it('should return 400, if no token is provided', (done) => {
    chai.request(server)
      .post('/api/v1/products')
      .send({
        name: 'air max',
        price: 1000,
        quantity_in_inventory: 3,
        product_image: 'https://i.imgur.com/V0qHM1d.jpg',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.exist;
        done();
      });
  });
});
