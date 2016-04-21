var express = require("express");
var http = require('http');
var app = express();
var server = http.createServer(app);
// choose a port
var port = 3700;
//get root sor just localhost:3700/
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

// Pass express to socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

});