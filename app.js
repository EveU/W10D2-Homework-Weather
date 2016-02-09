var express = require('express');
var app = express();
var http = require('http');
var expressLayouts = require('express-ejs-layouts');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static('public'));


app.get('/weather', function(req, res){
  res.render('weather');
});

app.get('/weather/:city', function(request, response){
  http.get('http://api.openweathermap.org/data/2.5/weather?q=' + request.params.city + '&appid=d18f001d3d186e0d5d7677ca7f09527e', function(res){
    
    var body = '';

    res.on('data', function(d){
      body += d;
    });

    res.on('end', function(){
      var report = JSON.parse(body);
      response.send(report);
    });

  });
});



app.listen('3000', function(req, res){
  console.log('serving on port 3000');
});