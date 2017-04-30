// dependencies
var express = require("express");
var router = express.Router();

// get our burger model
var burger = require("../models/burgers.js");

// Create our routes
// index route
router.get("/", function(req, res) {
  // use the burger.all method to print non-devoured and devoured burgers
  // it only needs the callback function
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

// route hit when new burger is added to db
router.post("/", function(req, res) {
  // send burgers.create method the columns, values and callback function it requires 
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.name, false
  ], function() {
    res.redirect("/");
  });
});

// this is the route hit when <Devour it!> button is clicked
router.put("/:id", function(req,res){
  // use incoming ID in our condition (WHERE id=<id>)
  var condition = "id = "+req.params.id;

  // send burger.js update function our table change object, condition (id=<id>) and a callback function, which reloads the page
  burger.update({devoured:true},condition,function(){
    res.redirect("/");
  });
});
    

// Export routes for server.js to use.
module.exports = router;
