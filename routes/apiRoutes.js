var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // setevents page refresh that updates the current deals handlebars varaibles with current deals
  app.get("/updateEventsPage", function (req, res) {
    console.log("\n\n" + req.body + "\n\n")
    db.user.findOne({
      where: {
        businessName: req.businessName,
      }
    }).then(function (result) {
      console.log(result)
      res.render("setevents", {
        currentMondayDeals: result.monday,
        currentTuesdayDeals: result.tuesday,
        currentWednesdayDeals: result.wednesday,
        currentThursdayDeals: result.thursday,
        currentFridayDeals: result.friday,
        currentSaturdayDeals: result.saturday,
        currentSundayDeals: result.sunday
      })
    });
  });

  // Create a new example
  // app.post("/submitEvents", function (req, res) {
  //   console.log("\n\n\n Events submitted \n\n\n")
  //   db.Example.create(req.body).then(function (result) {
  //     res.json(result);
  //   });
  // })

    // Update Table
    app.post("/submitEvents2", function (req, res) {
      console.log("\n\n\n Events submitted "+req.body.businessName+"\n\n\n")

      db.user.find({ where: { business: req.body.businessName } })
      .then( function (result) {
        // Check if record exists in db
        if (result) {
          result.updateAttributes({
            monday: req.body.monday,
            tuesday: req.body.tuesday,
            wednesday: req.body.wednesday,
            thurdsday: req.body.thursday,
            friday: req.body.friday,
            saturday: req.body.saturday,
            saturday: req.body.sunday,
          })
          // .success(function () {})
        }
      })
    
      // db.user.update(
      //   {monday: req.body.monday},
      //   {returning: true, where: {id: req.params.bookId} }
      // ).then(function(rowsupdate){
      //   res.json(rowsUpdate)
      // });
    });

    

};
