import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('INDEX route', () => {
  it('should return 200', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res.body.message).to.equal('welcome to store manager');
        expect(res.body.message).to.exist;
        expect(res.status).to.equal(200);
        done(err);
      });
  });
  it('should return route not found for invalid endpoint', (done) => {
    chai.request(server)
      .get('/api/v1/p')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done(err);
      });
  });
  it('should return 200 for home route', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done(err);
      });
  });
});
