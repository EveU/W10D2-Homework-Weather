var express = require('express');
var app = express();

app.get('/reports', function(req, res){
  res.send('test');
});




app.listen('3000', function(req, res){
  console.log('serving on port 3000');
});