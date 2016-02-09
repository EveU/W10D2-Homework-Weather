var express = require('express');
var app = express();
var http = require('http');

app.get('/reports', function(req, res){
  res.send('test');
});

app.get('/reports/:city', function(request, response){
  http.get('http://api.openweathermap.org/data/2.5/weather?q=' + request.params.city + '&appid=d18f001d3d186e0d5d7677ca7f09527e', function(res){
    
    var body = '';

    res.on('data', function(d){
      body += d;
    });

    res.on('end', function(){
      console.log(body);
      var report = JSON.parse(body);
      response.send(report['weather'][0]);
    });

  });
});



app.listen('3000', function(req, res){
  console.log('serving on port 3000');
});