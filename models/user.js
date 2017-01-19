var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
// above after clearing linter error which says has unnecessary \[ /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// to make sure the email input is correct

// there are different types of passport log in!

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be between 3 and 99 characters'],
    maxlength: [99, 'Name must be between 3 and 99 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be between 8 and 99 characters'],
    maxlength: [99, 'Password must be between 8 and 99 characters']
  }
})

// the callback function can be anything and it will still callback for the next thing
UserSchema.pre('save', function (next) {
  var user = this

  console.log('user is new', user.isNew)
  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // hash the password
  var hash = bcrypt.hashSync(user.password, 10)

  // Override the cleartext password with the hashed one
  user.password = hash
  next()
})

UserSchema.methods.validPassword = function (password) {
  // Compare is a bcrypt method that will return a boolean,
  // cannot use fat arrow as it will not bind this
  return bcrypt.compareSync(password, this.password)
}

// giving mongoose a set of options. when you convert to json apply this option.
// this is used in the test to check password has been passed to the json file.
UserSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    // delete the password from the JSON data, and return
    // so that password will not be added to the JSON file
    delete ret.password
    return ret
  }
}

// perform a transformation of the resulting object based on some criteria, say to remove some sensitive information or return a custom object. In this case we set the optional transform function.
// ret The plain object representation which has been converted

module.exports = mongoose.model('User', UserSchema)
