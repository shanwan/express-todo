require('dotenv').config({ silent: true })
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const todosController = require('./controllers/todos_controller')
const userAuth = require('./controllers/auth')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const express = require('express')
const morgan = require('morgan')
const app = express()

if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/todo-list-test')
} else {
  mongoose.connect('mongodb://localhost/todo-list')
}
mongoose.Promise = global.Promise
app.set('view engine', 'ejs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
// IMPORTANT: You must include the passport configuration below your session configuration. This ensures that Passport is aware that the session module exists.
app.use(flash())

// body parser and express use first
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'views')))
app.use(ejsLayouts)
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use(function (req, res, next) {
  // before every route, attach the flash messages and current user to res.locals. this is custom middleware
  res.locals.alerts = req.flash()
  res.locals.currentUser = req.user
  next()
})
// app.get('/', function (req, res) {
//   res.send('Welcome')
// })
// app.get('/', function(req, res) {
//   // use sendFile to render the index page
//   res.sendFile('index.html');
// })
// Also, rename the .html file to a .ejs file. We'll see that the .ejs extension is optional in the route, but necessary in the file's actual name.

app.get('/index', function (req, res) {
  res.render('index', {name: 'User'})
})

app.use('/todos', todosController)
app.use('/auth', userAuth)
// tell your app to use the module - prefix route

app.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile')
})

// example create call
// todosController.create({
  // name: 'write code',
  // description: 'homework',
  // completed: false
// })

// example list call
// todosController.list()

// app.get('/', function (req, res) {
//   res.send('test')
// })

// do we need both??? don't need
// app.listen(3000)

var server = app.listen(process.env.PORT || 3001)
console.log('Server UP')

// we export the running server so we can use it in testing
module.exports = server
