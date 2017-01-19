const express = require('express')
const User = require('../models/user')
const passport = require('../config/ppConfig')
const router = express.Router()

router.get('/signup', function (req, res) {
  res.render('auth/signup')
})

router.get('/login', function (req, res) {
  res.render('auth/login')
})

router.post('/signup', function (req, res) {
  User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  }, function (err, createdUser) {
    if (err) {
      // console.log('An error occurred: ' + err)
      // FLASH
      req.flash('error', 'Could not create user account')
      res.redirect('/auth/signup')
    } else {
      // FLASH
      passport.authenticate('local', {
        successRedirect: '/profile',
        successFlash: 'Account created and logged in'
      })(req, res)
      // multiple logs in has complexity. there can be multiple routes if you have different passport strategies
    }
  })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}))

router.get('/logout', function (req, res) {
  req.logout()
  // FLASH
  req.flash('success', 'You have logged out')
  res.redirect('/')
})

module.exports = router
