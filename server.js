require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var env = require('dotenv').load()
var session = require('express-session')
var passport = require('passport')

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;


//For BodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// For Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Models
var models = require("./models");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
var authRoute = require('./routes/auth.js')(app, passport);

var syncOptions = { force: false };

//load passport strategies
 
require('./config/passport/passport.js')(passport, models.user);

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

//Sync Database
 
models.sequelize.sync().then(function() {
 
  console.log('Nice! Database looks fine')


}).catch(function(err) {

  console.log(err, "Something went wrong with the Database Update!")

});


app.listen(5000, function(err) {

  if (!err)

      console.log("Site is live");
       
  else console.log(err)

});

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
