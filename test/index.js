'use strict';

// Set the 'NODE_ENV' env var to 'test' so other modules
// can configure themselves according to this
process.env.NODE_ENV = 'test';

// Require deps
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

// Define the assertion syntax to use
const expect = chai.expect;

// Tell chai to use the Http module
chai.use(chaiHttp);

// Begin a test suite
describe('Index', () => {

  // Test describe setup. Runs before all tests in this describe
  before(done => {
    // Async tasks that call done() after finished
    done();
  });

  // Test setup. Runs before each test
  beforeEach(done => {
    // Async tasks that call done() after finished
    done();
  });

  // Define a test block
  describe('GET /', () => {

    // Define a test
    it('should respond with \'Hello World!\' message', done => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.body).to.include.keys('message');
          expect(res.body.message).to.equal('Hello world! This is being live reloaded!');
          done();
        });
    });
  });

});

