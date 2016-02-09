var City = function(city){
  this.url = "http://localhost:3000/weather/" + city;
  this.weather;
  this.temperatures;
}

City.prototype = {
  get: function(callback){
    var that = this;
    var request = new XMLHttpRequest();
    request.open('GET', this.url);
    request.onload = function(){
      var data = JSON.parse(request.responseText);
      that.weather = data['weather'][0];
      that.temperatures = data['main'];
      callback();
    }
    request.send(null);
  }
}


window.onload = function(){
  var form = document.getElementById("citySearch");
  var weatherView = document.getElementById("cityWeather");

  form.onsubmit = function(event){
    event.preventDefault();
    var city = form.city.value;
    var currentCity = new City(city);

    currentCity.get(function(){
      var weather = currentCity.weather;
      var weatherDisplay = "<h4>"+city+"</h4><img src=http://openweathermap.org/img/w/" + weather.icon + ".png>" + weather.main;
      weatherView.innerHTML = weatherDisplay;
    });
  }
}