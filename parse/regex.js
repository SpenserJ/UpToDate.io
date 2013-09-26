var Class = require('pseudoclass')
  , Request = require('request')
  , _ = require('lodash');

var ParseRegex = Class({
  initialize: function initialize(settings) {
    if (typeof settings.regex !== 'RegExp') {
      settings.regex = new RegExp(settings.regex, 'g');
    }
  },

  getVersion: function getVersion(settingsOriginal, callback) {
    var self = this
      , settings = _.cloneDeep(settingsOriginal);

    self.initialize(settings);

    Request(settings.url, function (err, res, body) {
      if (err) { throw err; }
      self.parse(body, settings, callback);
    });
  },

  parse: function parse(body, settings, callback) {
    var versions = []
      , match;
    while ((match = settings.regex.exec(body)) !== null) {
      versions.push(match[1]);
    }
    console.log('Found ' + versions.length + ' versions for ' + settings.name);
    callback(settings.name, versions);
  },
});

module.exports = ParseRegex;
