var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    console.log("\n\n\n Current User: " + req.user + "\n\n\n")
    db.Example.findAll({}).then(function (results) {
      res.render("index", {
        msg: "Welcome!",
        user: results
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/regist", function (req, res) {
    res.render("regist")
  });

  app.get("/business/signin", function (req, res) {
    res.render("signin")
  });

  app.get("/setevents", function (req, res) {
    if (req.user) { //only lets user alter events if they are logged in
      res.render("setevents", {
        username: req.user.firstname,
        businessName: req.user.business
      })
    } else {
      res.render("signin")
    }

  });

  app.get("/contact", function (req, res) {
    res.render("contactus")
  })

  app.get("/user", function(req, res) {
    db.user.findAll({}).then(function(dbusers) {
      res.render("user", {
        msg: "Welcome!",
        user: dbusers
      });
    });
  });
 
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
