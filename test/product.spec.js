import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
const should = chai.should(); // eslint-disable-line
const { expect } = chai;
describe('GET /products', () => {
  it('should get all products', (done) => {
    chai.request(server)
      .get('/api/v1/products')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
describe('GET /products/:id', () => {
  it('should return 404 if an invalid id is passed', (done) => {
    chai.request(server)
      .get(`/api/v1/products/${9}`)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  });
  it('should return a product if id is valid', (done) => {
    chai.request(server)
      .get(`/api/v1/products/${1}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done(err);
      });
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
        quantityInInventory: 3,
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        res.should.have.status(201);
        expect(res.body).to.exist;
        expect(res.body.name).to.equal('air max');
        expect(res.body.price).to.equal(1000);
        expect(res.body.quantityInInventory).to.equal(3);
        done();
      });
  });
});
