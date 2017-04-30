// Import MySQL connection.
var connection = require("../config/connection.js");
     /*
     * `selectAll()` 
     * `insertOne()` 
     * `updateOne()`
      */ 

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
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
  
  /*
  ,
  delete: function(table, condition,cb){
    var queryString = "DELETE FROM "+table+"WHERE "+condition;
    console.log(queryString);
    connection.query(queryString,function(result){
      cb(result);
      });  
  }
  */
};

// Export the orm object for the model (cat.js).
module.exports = orm;
