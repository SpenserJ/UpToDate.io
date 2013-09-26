var request = require('request')
  , parsers = {};

var versionParser = {
  'PHP5 Old Stable (PPA)': {
    author: 'ondrej',
    ppa: 'php5-oldstable',
    package: 'php5',
    type: 'ppa',
  },
  'PHP5 (PPA)': {
    author: 'ondrej',
    ppa: 'php5',
    package: 'php5',
    type: 'ppa',
  },
  /*
  'Ubuntu Lucid (10.04 LTS) - apache2': {
    url: 'http://packages.ubuntu.com/lucid/apache2',
    regex: /Package: apache2 \(([^)]+)\)/g,
  },
  'Ubuntu Precise (12.04 LTS) - apache2': {
    url: 'http://packages.ubuntu.com/precise/apache2',
    regex: /Package: apache2 \(([^)]+)\)/g,
  },
  'Ubuntu Quantal (12.10) - apache2': {
    url: 'http://packages.ubuntu.com/quantal/apache2',
    regex: /Package: apache2 \(([^)]+)\)/g,
  },
  'Ubuntu Raring (13.04) - apache2': {
    url: 'http://packages.ubuntu.com/raring/apache2',
    regex: /Package: apache2 \(([^)]+)\)/g,
  },*/
  'Ubuntu Saucy (13.10) - apache2': {
    release: 'saucy',
    package: 'apache2',
    type: 'ubuntu_package',
  },
  'Node.js': {
    url: 'http://nodejs.org/',
    regex: /Current Version: v([^<]+)/g,
    type: 'regex',
  },
};

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
