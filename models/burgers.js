// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burgers = {
  // gets all records from orm.selectAll function by passing desired table and a callback, which just passes  the results back to the .all route at burgerController.js
  // that is, "cb"" is the anon. function in the burgerController.js route that renders the data called "res" here
  all: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },

  // This is the method called when the .put method is used. The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    // send the ORM insertOne method our table, and insert values as cols and vals, and a callback that passes through the res value
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  
  // gets {key:value} object for a table update, the WHERE condition and a callback
  update: function(objColVals, condition, cb) {
    // sends orm.updateOne function the table to use and passes through the table update object, condition and a callback to pass results up the chain
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = burgers;
