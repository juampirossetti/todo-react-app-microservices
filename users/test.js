//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('./User');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const url = require('./server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
  let _ID = null;
  /*
   * Test /GET User index route
   */
  describe('/GET all Users: ', () => {
    it('should get all users', done => {
      chai
        .request(url)
        .get('/api/users')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body.users).to.be.an('array');
          done();
        });
    });
  });

  /*
   * Test /POST User route
   */
  describe('/POST User:', () => {
    it('it should POST a new user', done => {
      chai
        .request(url)
        .post('/api/user')
        .send({ name: 'Juan Pablo' })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.user).to.include({ name: 'Juan Pablo' });
          _ID = res.body.user._id;
          done();
        });
    });
  });
  /*
   * Test the /POST User with error
   */
  describe('/POST User with error: ', () => {
    it('should receive an error', done => {
      chai
        .request(url)
        .post('/api/user')
        .send({ name: 'Jp' })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          done();
        });
    });
  });

  /*
   * Test /PUT User
   */
  describe('Update the name of a User:', () => {
    it('should update the name of the user', done => {
      chai
        .request(url)
        .put('/api/user/' + _ID)
        .send({ name: 'Juan' })
        .end(function(err, res) {
          expect(res.body.user).to.include({ name: 'Juan' });
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  /*
   * Test /DELETE User
   */

  describe('Delete a user: ', () => {
    it('should delete the user', done => {
      chai
        .request(url)
        .get('/api/users')
        .end(function(err, res) {
          const length = res.body.users.length;
          expect(res).to.have.status(200);
          chai
            .request(url)
            .del('/api/user/' + _ID)
            .end(function(err, res) {
              expect(res).to.have.status(200);
              chai
                .request(url)
                .get('/api/users')
                .end(function(err, res) {
                  const newLength = res.body.users.length;
                  expect(length).to.equal(newLength + 1);
                  expect(res).to.have.status(200);
                  done();
                });
            });
        });
    });
  });
});

