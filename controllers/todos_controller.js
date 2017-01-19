const express = require('express')
const Todo = require('../models/todo')
const User = require('../models/user')
const mongoose = require('mongoose')
const router = express.Router()

router.post('/', function (req, res) {
  // console.log(req.body)
  Todo.create(req.body, function (err, todo) {
    if (err) {
      res.send('unsuccessful')
      return
    }
    res.redirect('/todos/' + todo._id)
  })
})

router.get('/new', function (req, res) {
  res.render('new')
})

// dont have to write todos
router.get('/', function (req, res) {
  Todo.find({}, function (err, todos) {
    if (err) {
      res.send('unsuccessful')
      return
    }
    res.render('todos', {title: 'List of To Dos', todos: todos})
  })
})

// address bar is now like a search function and inputs the id you put after /todos/idx and adds to object req.params
router.get('/:idx', function (req, res) {
  console.log(req.user)
  Todo.findById(req.params.idx, function (err, todo) {
    if (err) return res.send('unsuccessful')
    res.render('todo', {title: 'To Do', todo: todo})
  })
})

router.get('/:idx/edit', function (req, res) {
  res.render('edit', {id: req.params.idx})
})

// update
router.put('/:idx', function (req, res) {
  // console.log(req.body)
  Todo.update({_id: req.params.idx}, {$set: {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  }}, {runValidators: true}, function (err, todo) {
    if (err) return res.send('unsuccessful')
    res.redirect(`/todos/${req.params.idx}`)
  })
})
// added to validate whether the update is pass the validation.

router.delete('/:idx', function (req, res) {
  console.log('check' + req.params.idx)
  Todo.findOneAndRemove({ _id: req.params.idx }, function (err) {
    if (err) return res.send('unsuccessful')
    res.redirect('/todos')
  })
})

module.exports = router
