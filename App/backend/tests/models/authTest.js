require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../../server'); // Adjust the path to your Express app
const User = require('../../models/userModel');

describe('Authentication Tests', () => {
  it('should register a new user', async () => {
    const res = await request(app)
    .post('/api/auth/register')
    .send({
        username: 'newUser',
        email: 'newUser@example.com',
        password: 'Password123!',
        fullName: 'New User FullName'
    });
    if(res.status !== 201) {
        console.log(res.body);
    }
    expect(res).to.have.property('status', 201);
    expect(res.body).to.have.property('user');
  });

  it('should login user and return a token', async () => {
    const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'newUser@example.com',
      password: 'Password123!'
    });
    if(res.status !== 200) {
        console.log(res.body);
    }
    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('token');
  });

  let token;
  before(async () => {
    const res = await request(app)
      .post('/api/auth/login') // Your login endpoint
      .send({
        username: 'newUser',
        password: 'Password123!'
      });
    token = res.body.token;
  });

  after(async () => {
    await User.deleteOne({ username: 'newUser' });
  });
});
