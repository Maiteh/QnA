var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//routing and
app.get('/', function(req, res){
  res.sendfile('index.html');
});

//Listen to the connection event for incoming sockets, and I log it to the console
io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});