var web = require('./lib/web')
  , request = require('request')
  , _ = require('lodash')
  , parsers = {};

var versionParser = require('./software.json');

web.app.get('/', function (req, res) {
  var output = '<ul>';
  var keys = Object.keys(versionParser)
    , i, software
    , reduceProperties = function reduceProperties(properties, value, key) {
        return properties.push(key + '=' + value);
      };

  for (i = 0; i < keys.length; i++) {
    software = versionParser[keys[i]];
    output += '<li><a href="/version?' + 
      _.transform(software, reduceProperties, []).join('&') + '">' + keys[i] + '</a></li>';
  }
  output += '</ul>';
  res.send(output);
});

web.app.get('/version', function (req, res) {
  var details = req.query;

  if (typeof parsers[details.type] === 'undefined') {
    parsers[details.type] = new (require('./parse/' + details.type))();
  }

  parsers[details.type].getVersion(details, function (name, version) {
    res.send({ name: name, version: version });
  });
});

/*
var keys = Object.keys(versionParser)
  , i
  , versionInfo = {};

for (i = 0; i < keys.length; i++) {
  var name = keys[i];
  getVersion(name, versionParser[name]);
}

function getVersion(name, details) {
  console.log('Checking ' + name);
  details.name = name;
  if (typeof parsers[details.type] === 'undefined') {
    parsers[details.type] = new (require('./parse/' + details.type))();
  }

  parsers[details.type].getVersion(details, checkForCompletion);
}

function checkForCompletion(name, versions) {
  versionInfo[name] = versions;
  if (Object.keys(versionInfo).length === Object.keys(versionParser).length) {
    console.log(versionInfo);
  }
}
*/
