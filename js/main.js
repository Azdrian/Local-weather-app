$(function() {
  //get location info using ip address
  $getLocation = function() {
    var $freeGeoIpUrl = "//freegeoip.net/json/?callback";
    $.getJSON($freeGeoIpUrl, function($locationInfo) {
      var $city = $locationInfo.city,
        $country = $locationInfo.country_name,
        $region = $locationInfo.region;

      //Display location on page
      $('.location').append(
        "<p class='location'>" +
        "City: " + $city + ", " +
        "Country: " + $country +
        "</p>"
      );

      //THis funcation makes a request to the openweather Api to reqest info on the given location
      $getOpenWeatherApiData($city);
    });
  };

  //get data from openweathermap and display weather info that corresponds  to the location info
  $getOpenWeatherApiData = function(city) {
    var $appId = "65ee5604d6ed4bba5460939c0d5f6724";
    $apiUrl = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?units=metric&q=" + city + "&APPID=" + $appId + "&callback=?";

    $.ajax({
      url: $apiUrl,
      dataType: "jsonp",
      success: function($weatherData) {
        var $temperture = $weatherData.main.temp,
          $celsius = Math.round($temperture * 10) / 10,
          $ferenheit = Math.round(($celsius * 9 / 5 + 32) * 10) / 10,
          $description = $weatherData.weather["0"].description,
          $weatherId = $weatherData.weather["0"].id;
        $icon = "<i class='wi wi-flip-horizontal wi-fw wi-owm-" + $weatherId + "'" + ">" + "</i>";

        $('.weather-info').append(
          "<p>" + $icon + "</p>" +
          "<p class=' degrees'>" + $celsius + "° C</p>" +
          "<p >" + $description + "</p>"
        );

        //When degrees is clicked switch from celsius to ferenheit
        $(".degrees").click(function() {
          $(".degrees").toggle("fast", function() {
            if ($(".degrees").text() === $celsius + "° C") {
              $(".degrees").text($ferenheit + "° F").show();
            } else {
              $(".degrees").text($celsius + "° C").show();
            }
          });
        });
      }
    });

  };

  //This is the main function where it deals with making the API request and displaying corresponding information 
  $getLocation();

});
