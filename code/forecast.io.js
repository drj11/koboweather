exports.url = function(option) {
  return  "https://api.forecast.io/forecast/" +
    option['apikey-forecast.io'] +
    "/" + option.latitude +
    "," + option.longitude
}
