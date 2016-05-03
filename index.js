var express = require("express");
var http = require('http');
var app = express();
var assert = require("assert");
var favicon = require('serve-favicon');
var autoIncrement = require('mongoose-auto-increment');
//Mongo connection to save the messages
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/q-a';
var Schema = mongoose.Schema;
var connection = mongoose.createConnection(url);
autoIncrement.initialize(connection);

// Defining Schema model for mongo db. For the users.
var userSchema = new Schema({
    user_id: Number,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: Date,
    updated_at: Date
});

var server = app.listen(3000, function() {
    //adress = localhost, port = 3000
    console.log('Express server listening on port ' + server.address().port);
});
//get root or just localhost:3700/
app.get("/", function(req, res){
    res.send('It works! look at me now :D');
});

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

    /**
     * Trigger message event
     * _clientUserId id of user on server database
     * _clientId id of current user socket
     * data hold message data
     *
     * handle connection from server and show message on screen.
     * will make sure own messega's are on the right other on the left.
     */
    socket.on('message', function (_clientUserId, _clientId, data) {
        console.log('Message on room ' + data.room_id);
        var room_id = data.room_id;

        var tempRoom = room_id.split('_');
        var tempRoomId = tempRoom.length == 2 ? tempRoom[1] + '_' + tempRoom[0] : '';

        if(data.message) {
            var cls = 'row';
            // Handle on destination client
            if (_clientId != clientId) {
                cls = 'row_other';
                notifyMe(data);

                // If not is MAIN_ROOM, show unread count message
                if (room_id == MAIN_ROOM) {
                    if (currRoomId != MAIN_ROOM) {
                        var currUnread = $('#user-list li#main_room .unread').text();
                        currUnread++;
                        $('#user-list li#main_room .unread').text(currUnread).show();
                    }
                } else if (currRoomId != room_id && currRoomId != tempRoomId) {
                    // Show unread count message on private chat
                    var currUnread = $('#user-list li[data-rid=' + _clientUserId + '] .unread').text();
                    currUnread++;
                    $('#user-list li[data-rid=' + _clientUserId + '] .unread').text(currUnread).show();
                }
            }
            if (currRoomId == room_id || tempRoomId == currRoomId) {
                // Show message on screen
                var date = new Date();
                var html = '<div class="' + cls + '">' +
                    '<div class="r-message"><div class="username">' + data.username + '</div><div class="message">' + data.message + '</div>' +
                    '<div class="profile"><img src="/images/profile.jpg" class="img-rounded"></div></div>' +
                    '<div class="date">' + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2) + '</div>' +
                    '</div>';
                $('#' + MAIN_ROOM).append(html).scrollTop($('#' + MAIN_ROOM)[0].scrollHeight);
            }
        } else {
            console.log("There is a problem:", data);
        }
    });

    //private chat
    socket.emit('subscribe', _userId, _clientId, roomId);
    socket.on('subscribe', function (_clientUserId, clientId, room_id) {
        if (room_id != mainRoom) {
            room_id = room_id + '_' + _clientUserId;

            if (rooms.indexOf(room_id) == -1) {
                // Create private chat between this socket and client
                socket.join(room_id);
                userSockets[clientId].join(room_id);

                rooms.push(room_id);
            }
        }

        // Create message content to hold between these two users
        io.sockets.in(room_id).emit('subscribe', _clientId, room_id);
    });
    // Show desktop notification
    $(function() {
        // request permission on page load
        if (Notification.permission !== "granted")
            Notification.requestPermission();
    });

    function notifyMe(data) {
        if (!Notification) {
            alert('Desktop notifications not available in your browser. Try Chromium.');
            return;
        }

        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {
            var notification = new Notification('New message', {
                icon: SERVER + '/images/so_icon.png',
                body: data.message,
            });

            // Open and active current chat window
            notification.onclick = function () {
                chatWindow.focus();
            };
        }
    }

});

