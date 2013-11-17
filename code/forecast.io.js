exports.url = function(option) {
  return  "https://api.forecast.io/forecast/" +
    option['apikey-forecast.io'] +
    "/" + option.latitude +
    "," + option.longitude
}

exports.read = function(cb) {
  var json = fs.readFileSync('forecast.json')
  var forecast = JSON.parse(json)
  var rows = []
  var row = []
  var time = []
  var hourly = forecast.hourly.data.slice(0,24)
  hourly.map(function(x) {
      var date = new Date(x.time*1000)
      console.log(date.toISOString(), x.icon)
  })
  var o = summarise3H(hourly)
  var i
  for(i=0; i<o.length; ++i) {
    var filename = path.join("rawimage", o[i].icon + '.raw')
    if(fs.existsSync(filename)) {
      o[i].icon = filename
    } else {
      console.warn("No icon for " + o[i].icon)
      o[i].icon = 'rawimage/default.raw'
    }
  }
  console.log(o)
  cb(o, {})
}

// Summarise a list of hourlies into 3-hourly blocks.
summarise3H = function(hourly) {
  var res = []
  var i
  for(i=0; i<hourly.length; i+=3) {
    var slice = hourly.slice(i, i+3)
    var icon = simpleIcon(slice)
    var time = new Date(hourly[i].time*1000).toISOString()
    res.push({icon: icon, time: time})
  }
  return res
}

simpleIcon = function(l) {
  var simples = l.map(simplify)
  return majority(simples)
}
  

// Simplify the icon text.
simplify = function(obj) {
  var o = obj.icon
  var s = o
  // Remove first part of "partly-cloudy-night", and so on.
  s = s.replace(/partly-/, '')
  // Remove final "-day" or "-night".
  s = s.replace(/-(day|night)$/, '')
  return s
}

// Return the majority element of *l*.
majority = function(l) {
  l[2].failIfListTooShort
  var count = {}
  l.map(function(x) {
    count[x] |= 0
    count[x] += 1
  })
  for(el in count) {
    if(count[el] >= 2) {
      return el
    }
  }
  return el
}

