var apiUrl = 'https://fcc-weather-api.glitch.me/api/current?';
var latitude, longitude;
var tempUnit = 'C';
var currentTempInCelsius;
var picUrl;

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = 'lat=' + position.coords.latitude;
      var lon = 'lon=' + position.coords.longitude;
      loadWeather(lat, lon);
    });
  } else {
    console.log('Geolocation is not supported by this browser.');
  }

  $('#tempunit').click(function() {
    var currentTempUnit = $('#tempunit').text();
    var newTempUnit = currentTempUnit == 'C' ? 'F' : 'C';
    $('#tempunit').text(newTempUnit);
    if (newTempUnit == 'F') {
      var fahTemp = Math.round(parseInt($('#temp').text()) * 9 / 5 + 32);
      $('#temp').text(fahTemp + ' ' + String.fromCharCode(176));
    } else {
      $('#temp').text(currentTempInCelsius + ' ' + String.fromCharCode(176));
    }
  });
});

function loadWeather(lat, lon) {
  var urlString = apiUrl + lat + '&' + lon;
  $.ajax({
    url: urlString,
    success: function(result) {
      console.log('Sucess', result);
      $('#city').text(result.name + ', ');
      $('#country').text(result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
      $('#temp').text(currentTempInCelsius + ' ' + String.fromCharCode(176));
      $('#tempunit').text(tempUnit);
      $('#desc').text(result.weather[0].main);
      $('#countryName').text(result.sys.country);
      pictureGenerate(result.weather[0].main);
    },
  });
}

function pictureGenerate(desc) {
  var desc = desc.toLowerCase();
  switch (desc) {
    case 'drizzle':
      setBackgroundPicture('desc');
      break;
    case 'clouds':
      setBackgroundPicture(
        'http://freebigpictures.com/wp-content/uploads/2009/09/cumulus-clouds.jpg'
      );
      break;
    case 'rain':
      setBackgroundPicture(
        'https://www.wallpaperu3.com/wp-content/mywallpapers/rainy-weather-wallpaper-4k-5k.jpg'
      );
      break;
    case 'snow':
      setBackgroundPicture(
        'https://upload.wikimedia.org/wikipedia/commons/1/1c/Winter_Season.JPG'
      );
      break;
    case 'clear':
      setBackgroundPicture(
        'http://res.cloudinary.com/mitul/image/upload/v1522073111/dd_cymoyj.jpg'
      );
      break;
    case 'thunderstom':
      setBackgroundPicture(
        'https://www.goodfreephotos.com/albums/weather/lightning-across-the-sky.jpg'
      );
      break;
    default:
      setBackgroundPicture(
        'http://res.cloudinary.com/mitul/image/upload/v1522073111/dd_cymoyj.jpg'
      );
  }
}

function setBackgroundPicture(url) {
  console.log('pic call');

  $('.bg').css('background-image', 'url(' + url + ')');
}
