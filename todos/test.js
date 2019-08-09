//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Todo = require('./Todo');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const url = require('./server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Todos', () => {
  let _ID = null;
  let user_id = require('mongoose').Types.ObjectId();
  /*
   * Test /GET Todo index route
   */
  describe('/GET all Todos: ', () => {
    it('should get all todos', done => {
      chai
        .request(url)
        .get('/api/todos')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body.todos).to.be.an('array');
          done();
        });
    });
  });

  /*
   * Test /POST Todo route
   */

  describe('/POST Todo:', () => {
    it('it should POST a new todo', done => {
      chai
        .request(url)
        .post('/api/todo')
        .send({ description: 'New Todo', state: 'todo', user_id: user_id })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.todo).to.include({ description: 'New Todo' });
          _ID = res.body.todo._id;
          done();
        });
    });
  });

  /*
   * Test the /POST Todo with error
   */

  describe('/POST Todo with error: ', () => {
    it('should receive an error', done => {
      chai
        .request(url)
        .post('/api/todo')
        .send({ description: 'Jp', state: 'doing', user_id: user_id })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          done();
        });
    });
  });

  /*
   * Test /PUT Todo
   */
  describe('Update the description of a Todo:', () => {
    it('should update the description of the todo', done => {
      chai
        .request(url)
        .put('/api/todo/' + _ID)
        .send({
          description: 'To be done by tomorrow',
          state: 'todo',
          user_id: user_id
        })
        .end(function(err, res) {
          expect(res.body.todo).to.include({
            description: 'To be done by tomorrow'
          });
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  /*
   * Test /DELETE User
   */

  describe('Delete a Todo: ', () => {
    it('should delete the todo', done => {
      chai
        .request(url)
        .get('/api/todos')
        .end(function(err, res) {
          const length = res.body.todos.length;
          expect(res).to.have.status(200);
          chai
            .request(url)
            .del('/api/todo/' + _ID)
            .end(function(err, res) {
              expect(res).to.have.status(200);
              chai
                .request(url)
                .get('/api/todos')
                .end(function(err, res) {
                  const newLength = res.body.todos.length;
                  expect(length).to.equal(newLength + 1);
                  expect(res).to.have.status(200);
                  done();
                });
            });
        });
    });
  });
});

