const mongoose = require('mongoose')
const User = require('./user') // need to ./ when referencing to another file otherwise, it will think that it is an node package

const todoSchema = new mongoose.Schema({
  username: {type: mongoose.Schema.Types.ObjectId, ref: User},
  name: {type: String, required: true, minlength: 5},
  description: {type: String},
  completed: {type: Boolean}
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
