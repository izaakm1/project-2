var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    console.log("\n\n Current User: " + req.user + "\n\n")
    db.user.findAll({}).then(function (results) {
      res.render("index", {
        user: results
      });
    });
  });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function (req, res) {
  //   db.Example.findOne({
  //     include: [{
  //       model: db.User
  //     }],
  //       where: { businessName: business }
  //   }).then(function (dbExample) {
  //     res.render("example", {
  //       example: dbExample,
  //     });
  //   });
  // });

  app.get("/regist", function (req, res) {
    res.render("regist")
  });

  app.get("/business/signin", function (req, res) {
    res.render("signin")
  });

  app.get("/setevents", function (req, res) {
    console.log("\n\n"+req.params.monday+"\n\n")
    if (req.user) { //only lets user alter events if they are logged in
      res.render("setevents", {
        username: req.user.firstname,
        businessName: req.user.business,

      })
    } else {
      res.render("signin")
    }

  });

  app.get("/user", function (req, res) {
    db.User.findAll({}).then(function (dbusers) {
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
