import chai from 'chai';
import chaiHttp from 'chai-http';
import product from '../server/routes/product-routes';
import server from '../index';

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;
describe('GET /products', () => {
  it('should return 200', (done) => {
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
  it('should be an object', (done) => {
    chai.request(server)
      .get(`/api/v1/products/${1}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
});
