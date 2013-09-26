var ParseRegex = require('./regex');

ParsePPA = ParseRegex.extend({
  initialize: function initialize(settings) {
    settings.regex = RegExp(settings.package + '\\s+<\\/td>\\s+<td>\\s+([^\\s]+)', 'gm');
    settings.url = 'https://launchpad.net/~' + settings.author + '/+archive/' + settings.ppa;
  },
});

module.exports = ParsePPA;
