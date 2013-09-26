var ParseRegex = require('./regex');

ParseUbuntuPackage = ParseRegex.extend({
  initialize: function initialize(settings) {
    settings.regex = RegExp('Package: ' + settings.package + ' \\(([^)]+)\\)', 'g');
    settings.url = 'http://packages.ubuntu.com/' + settings.release + '/' + settings.package;
  },
});

module.exports = ParseUbuntuPackage;
