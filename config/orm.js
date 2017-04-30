// Import MySQL connection.
var connection = require("../config/connection.js");

// helper function returns [?] array as long as input value.
function formattedValues(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
};

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // insert data into existing row, with one or more columns passed in as an array, 'cols'
  // uses the formattedValues() helper function
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table + "("+cols.toString()+") "+"VALUES ("+formattedValues(vals.length)+") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  // table update function
  // gets table to update, a table update object (key is column to set; value is value to set), a WHERE condition and a callback function

  updateOne: function(table, objColVals, condition, cb) {

    // build query string for mysql module; includes passing the table update object to the objToSql helper function, which returns a mysql-valid string <col>=<value>
    var queryString = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
