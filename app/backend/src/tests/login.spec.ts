import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

let response: Response;


describe('POST /login', () => {
  it('test token return', async () => {
    response = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'secret_user',
      });
      expect(response.body.user).to.have.property('email');
      expect(response.body.user).to.not.have.property('password');
      expect(response.body.user).to.have.property('id');
      expect(response.body.user).to.have.property('role');
      expect(response.body.user).to.have.property('username');
      expect(response.body).to.have.property('token');
    expect(response).to.have.status(200);
  });

  it('test login with bad email', async () => {
    response = await chai.request(app).post('/login').send({
      'email': 'tobias@tobiasl@trybe.com',
      'password': '123456789',
    });

    expect(response.body.message).to.be.equal('Incorrect email or password');
    expect(response.status).to.be.equal(401);
  });

  it('test login with bad password', async () => {
    response = await chai.request(app).post('/login').send({
      'email': 'tobias@trybe.com',
      'password': 'fail',
    });

    expect(response.body.message).to.be.equal('Incorrect email or password');
    expect(response.status).to.be.equal(401);
  });

  it('test without email', async () => {
    response = await chai.request(app).post('/login').send({
      'password': '123456789',
    });

    expect(response.body.message).to.be.equal("All fields must be filled");
    expect(response.status).to.be.equal(400);
  });

  it('test without password', async () => {
    response = await chai.request(app).post('/login').send({
      'email': 'tobias@trybe.com',
    });

    expect(response.body.message).to.be.equal("All fields must be filled");
    expect(response.status).to.be.equal(400);
  });
});

describe('GET /login/validate', () => {
  it('test user role', async () => {
    response = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'secret_user',
      });
    response = await chai.request(app)
      .get('/login/validate')
      .set('authorization', response.body.token);
    expect(response).to.have.status(200);
  });
  it('test without a authorization header', async () => {
    response = await chai.request(app).get('/login/validate');
    expect(response).to.have.status(401);
  });
});