var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')

// there are different types of passport strategy

/*
 * Passport "serializes" objects to make them easy to store, converting the
 * user to an identifier (id)
 */
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

/*
 * Passport "deserializes" objects by taking the user's serialization (id)
 * and looking it up in the database
 */
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
    // adds it to the req.user to recognize the user
  })
})

/*
 * This is Passport's strategy to provide local authentication. We provide the
 * following information to the LocalStrategy:
 *
 * Configuration: An object of data to identify our authentication fields, the
 * username and password
 *
 * Callback function: A function that's called to log the user in. We can pass
 * the email and password to a database query, and return the appropriate
 * information in the callback. Think of "cb" as a function that'll later look
 * like this:
 *
 * login(error, user) {
 *   // do stuff
 * }
 *
 * We need to provide the error as the first argument, and the user as the
 * second argument. We can provide "null" if there's no error, or "false" if
 * there's no user.
 */
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
  User.findOne({ email: email }, function (err, user) {
    if (err) return done(err)
    // authentication fail. user cannot log in. pass through the error to the done call back.
    // If no user is found
    if (!user) return done(null, false)

    // Check if the password is correct
    if (!user.validPassword(password)) return done(null, false)
    // null refers to no error.
    return done(null, user)
  })
}))

// export the Passport configuration from this module
module.exports = passport
