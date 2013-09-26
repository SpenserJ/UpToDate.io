var Class = require('pseudoclass')
  , Request = require('request');

var ParseRegex = Class({
  initialize: function initialize() {},

  getVersion: function getVersion(settings, callback) {
    var self = this;
    if (typeof settings === 'function') {
      callback = settings;
      settings = {};
    }
    settings = settings || {};
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
