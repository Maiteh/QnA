var express = require("express");
var http = require('http');
var app = express();
var server = http.createServer(app);
// choose a port
var port = 3700;
//Mongo connection to save the messages
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/q-a';
var Schema = mongoose.Schema;
var connection = mongoose.createConnection(url);

//get root or just localhost:3700/
app.get("/", function(req, res){
  res.send('Connection etablished!');
});
//Tell the server to which port to listen
server.listen(port);
console.log('Server started on port ' + port);
// declare where you define your views
app.set('views', __dirname + '/views');
//what view engine, ejs or jade
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.get("/", function(req, res){
  res.render("index");
});

/**
 * Pass express to socket.io
 * This is where were alle the code belongs
 * This method will handle all connection from all clients connected to our server.
 * The object socket is actually socket of the client.
 * This is the way client connect and send event to our server.
 * To send message to client we only need to do this
 * @type {http.Server}
 */
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

  //This will only send event to socket client
  socket.emit('message', messages);
  //broadcast to all clients
  io.sockets.in(room_id).emit('message', message);
  // To handle multiple users we'll need a login system
  socket.emit('regist', { username: username, password: password });
});