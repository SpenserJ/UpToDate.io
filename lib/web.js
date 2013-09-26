var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3001);

module.exports = {
  app: app,
  io: io,
};
