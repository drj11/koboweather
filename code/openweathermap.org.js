
exports.url = function(option) {
  return 'http://api.openweathermap.org/data/2.5/forecast?id=2638077&cnt=1'
}

exports.read = function(cb) {
  var json = fs.readFileSync('forecast.json')
  var forecast = JSON.parse(json)
  var simples = forecast.list.slice(0, 8).map(function(x) {
    var weatherId = String(x.weather[0].id)
    var filename = openweathermapImageFile(weatherId)
    return {time: x.dt_txt, icon: filename}
  })
  cb(simples, {location: forecast.city.name})
}

