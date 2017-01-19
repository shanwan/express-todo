/* global describe it */

var expect = require('chai').expect
var request = require('supertest')
var app = require('../index.js')
var mongoose = require('mongoose')
const Todo = require('../models/todo')

mongoose.connection.on('connected', function (done) { mongoose.connection.db.dropDatabase(done) })

describe('GET /', function () {
  it('should return a 200 response', function (done) {
    request(app).get('/').expect(200, done)
  })
})

// GET /todos
// ✓ should return a 200 response
// ✓ should return an array
// ✓ should return all the records in the database
describe('GET /todos', function () {
  it('should return a 200 response', function (done) {
    request(app).get('/').expect(200, done)
  })
  it('should return an array', function (done) {
    request(app).get('/todos')
    .set('Accept', 'application/json')
    .end(function (error, response) {
      expect(response.body).to.be.an('array')
      done()
    })
  })
  it('should return all records in the database', function (done) {
    request(app).get('/todos')
    .set('Accept', 'application/json')
    .end(function (error, response) {
      expect(response.body.length).to.be.equal(0)
      done()
    })
  })
})

// POST /todos
//   ✓ should return a 200 response
//   ✓ should return a 422 response if the field name is wrong
//   ✓ should return an error message if the name field is wrong
//   ✓ should add a new todo to the database
describe('POST /todos', function () {
  it('should return a 200 response', function (done) {
    request(app).post('/todos').expect(200, done)
  })
  it('should add a new todo to the database', function (done) {
    request(app).post('/todos')
    .set('Accept', 'application/json')
    .send({
      name: 'make a boat',
      description: 'CCA',
      completed: false
    })
    .expect(200, done)
  })
  it('should return 200 that item has property of name', function (done) {
    request(app).get('/todos')
    .set('Accept', 'application/json')
    .end(function (error, response) {
      expect(response.body[0]).to.have.property('name')
      done()
    })
  })
  it('should return a 422 response if the field name is wrong', function (done) {
    request(app).get('/todos')
    .set('Accept', 'application/json')
    .end(function (error, response) {
      expect(response.body[0].name).to.have.length.above(5)
      done()
    })
  })
})

// GET /todos/:id
//   ✓ should return a 200 response
//   ✓ should return an object containing the fields 'name', 'description' and 'completed'
describe('GET /todos/:id', function () {
  it('should return a 200 response', function (done) {
    request(app).get('/todos/:id').expect(200, done)
  })
  it('should add a new todo to the database', function (done) {
    request(app).post('/todos')
    .set('Accept', 'application/json')
    .send({
      name: 'make a ship',
      description: 'CCA',
      completed: false
    })
    .expect(200, done)
  })
  it('should return an object containing the fields', function (done) {
    request(app).get('/todos')
    .set('Accept', 'application/json')
    .end(function (error, response) {
      expect(response.body[0]).to.have.property('name')
      expect(response.body[0]).to.have.property('description')
      expect(response.body[0]).to.have.property('completed')
      done()
    })
  })
})

// PUT /todos/:id
//   ✓ should return a 200 response
//   ✓ should update a todo document
describe('PUT /todos/:id', function () {
  it('should return a 200 response', function (done) {
    request(app).put('/todos/:id').expect(200, done)
  })
  it('should update a todo document', function (done) {
    request(app).get('/todos/')
    .end(function (error, response) {
      request(app).put('/todos/', (response.body[0]._id))
      .send({'name': 'catch a spider'})
      .end(function (error, response) {
        expect(response.body.name).to.equal('catch a spider')
        done()
      })
    })
  })
})

// DELETE /todos/:id
//   ✓ should remove a todo document
describe('DELETE /todos/:id', function () {
  it('sshould remove a todo document', function (done) {
    request(app).get('/todos/')
    .end(function (error, response) {
      request(app).delete('/todos/', (response.body[0]._id))
      .end(function (error, response) {
        expect(response.body.length).to.be.length(1)
        done()
      })
    })
  })
})
