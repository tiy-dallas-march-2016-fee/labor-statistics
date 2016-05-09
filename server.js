var express = require('express');
var censusData = require('./data/qcew/census-data.js');

var app = express();

app.use(express.static('public'));


app.get('/api/qcew', function (req, res) {

  var success = function(data) {
    res.json(data);
  };

  var error = function(err) {
    res.json(err);
  }

  censusData.get(success, error)
});


app.listen(3002, function() {
  console.log('listening on port 3002');
});
