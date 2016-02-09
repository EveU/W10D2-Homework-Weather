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
      var today = new Date();  
      var d = today.getDay();  
      var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
      var day = daylist[d];
      var time = today.getHours();

      var weather = currentCity.weather;
      var temperatures = currentCity.temperatures;
      var weatherDisplay = "<h4>"+city+"</h4><p>" + day + " " + time + ":00</p><hr><p>"  + weather.main + "</p><img src=http://openweathermap.org/img/w/" + weather.icon + ".png><p>" + temperatures.temp + "°C<p>";
      weatherView.innerHTML = weatherDisplay;
    });
  }
}