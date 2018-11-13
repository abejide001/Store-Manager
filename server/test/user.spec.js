import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
const { expect } = chai;
describe('LOGIN route', () => {
  it('should return 400 if email is not provided', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: '',
        password: 'aaaa',
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('enter email');
        expect(res.body.message).to.exist;
        expect(res.status).to.equal(400);
        done(err);
      });
  });
  it('should return 400 if password is not provided', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'abejide@yahoo.com',
        password: '',
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('enter password');
        expect(res.status).to.equal(400);
        expect(res.body.message).to.exist;
        done(err);
      });
  });
  it('should return 400 if email is not valid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'abejide',
        password: 'aaaa',
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('Please enter a valid email address');
        expect(res.status).to.equal(400);
        expect(res.body.message).to.exist;
        done(err);
      });
  });
  it('should return 400 if password is not valid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'abejidefemi@gmail.com',
        password: 'aaaa',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.exist;
        done(err);
      });
  });
});
describe('REGISTER route', () => {
  it('should return 400 if token is not provided', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done(err);
      });
  });
});
