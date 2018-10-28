import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import ProductModel from '../server/src/models/Product';

chai.use(chaiHttp);
const should = chai.should(); // eslint-disable-line
const { expect } = chai;
describe('GET /products', () => {
  it('should get all products', (done) => {
    chai.request(server)
      .get('/api/v1/products')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.exist;
        expect(res.body).to.exist;
        done();
      });
  });
});
describe('PUT /products/:id', () => {
  it('should return 404 if an invalid id is passed', (done) => {
    (async () => {
      const product = await ProductModel.create(
        { name: 'some shoe', price: 50000, quantity_in_inventory: 3 },
      );
      const persistedProducts = await ProductModel.findAll();
      const count = persistedProducts.value.length - 1;
      const id = persistedProducts.value[count].id + 100;
      chai.request(server)
        .put('/api/v1/products/'+id)
        .send({ name: "some other shoe" })
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body.errors[0]).to.equal('Product does not exist');
          done(err);
        });
    })();
  });
  it('should update a product if id is valid', (done) => {
    (async () => {
      const product = await ProductModel.create(
        { name: 'fila jordan', price: 50000, quantity_in_inventory: 3 },
      );
    chai.request(server)
      .put('/api/v1/products/'+product.value.id)
      .send({ name: 'fila fubu', price: 55000, quantity_in_inventory: 5, })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.value.name).to.equal('fila fubu');
        expect(res.body.value.price).to.equal(55000);
        expect(res.body.value.quantity_in_inventory).to.equal(5);
        done(err);
      });
    })();
  });

  it('should return a 400 if update is invalid', (done) => {
    (async () => {
      const product = await ProductModel.create(
        { name: 'fila jordan', price: 50000, quantity_in_inventory: 3 },
      );
    chai.request(server)
      .put('/api/v1/products/'+product.value.id)
      .send({ name: 'fila', price: 0, quantity_in_inventory: 0, })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors.length).to.equal(3);
        done(err);
      });
    })();
  });
});
describe('GET /products/:id', () => {
  it('should return 404 if an invalid id is passed', (done) => {
    (async () => {
      const product = await ProductModel.create(
        { name: 'some shoe', price: 50000, quantity_in_inventory: 3 },
      );
      const persistedProducts = await ProductModel.findAll();
      const count = persistedProducts.value.length - 1;
      const id = persistedProducts.value[count].id + 100;
      chai.request(server)
        .get('/api/v1/products/'+id)
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body.message).to.equal('product not found');
          expect(res.body).to.not.be.empty;
          done(err);
        });
    })();
  });
  it('should return a product if id is valid', (done) => {
    (async () => {
      const product = await ProductModel.create(
        { name: 'fila jordan', price: 50000, quantity_in_inventory: 3 },
      );
    chai.request(server)
      .get('/api/v1/products/1')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body).to.exist;
        done(err);
      });
    })();
  });
});
describe('POST /products', () => {
  it('should return 400 if empty input is passed', (done) => {
    chai.request(server)
      .post('/api/v1/products')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  });
  it('should return an object if valid input is passed', (done) => {
    chai.request(server)
      .post('/api/v1/products')
      .send({
        name: 'air max',
        price: 1000,
        quantity_in_inventory: 3,
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.exist;
        done();
      });
  });
});
