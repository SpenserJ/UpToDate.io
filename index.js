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
        return properties.push(escape(key) + '=' + escape(value).replace(/\+/g, '%2B'));
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
  var details = {};
  _.each(req.query, function(value, key) {
    details[unescape(key)] = unescape(value);
  });
  console.log(details);

  if (typeof parsers[details.type] === 'undefined') {
    parsers[details.type] = new (require('./parse/' + details.type))();
  }

  parsers[details.type].getVersion(details, function (name, version) {
    res.send({ name: name, version: version });
  });
});
