/**
* TODO: Stream simple music between clients
*/

// SERVER address and port
var SERVER = 'http://localhost:3000';

var MAIN_ROOM = 'Intro Q&A';

// Chat window is current window
var chatWindow = window.self;

$(window).load(function() {

  // Add regular expression to check username valid
  $.validator.addMethod("regex", function(value, element, regexpr) {          
    return regexpr.test(value);
  }, "Please enter a valid username.");

  // Current user name
  var _username = null;

  // Current user_id
  var _userId = null;

  // socket of current connection
  var socket = io.connect(SERVER);

  // Field of message
  var field = $("#message");

  // Current client_id
  var clientId = null;

  // All users connected
  var users = [];

  // Current room_id. Default is MAIN_ROOM
  var currRoomId = MAIN_ROOM;

  // First register user
  var loginDialog = new BootstrapDialog.show({
    title: 'Login',
    closable: false,
    message: '<form id="login_form">Login ID: <input type="text" name="username" class="form-control" id="username"><br>Login Password: <input type="password" name="password" class="form-control" id="password"></form>',
    onshown: function(dialogRef) {
      $('#username').focus();
    },
    onhidden: function(dialogRef){
      $('#message').focus();
    },
    buttons: [
    {
      label: 'Sign In',
      cssClass: 'btn-primary',
      action: function(dialogRef) {
        $('#login_form').validate({
          debug: true,
          rules: {
            username: {
              required: true,
              regex: /^\S+$/ // Check has no whitespace
            },
            password: "required"
          }
        });

        var username = $('#username').val();
        var password = $('#password').val();

        if ($('#login_form').valid()) {
          _username = username;
          // Login user
          socket.emit('login', { username: username, password: password });
          $('body').after('<div id="active_room" style="display:none;">' + MAIN_ROOM + '</div>');
          $('#profile').text(username);
        }
      }
    },
    {
      label: 'Create Account',
      action: function(dialogRef) {
        $('#login_form').validate({
          debug: true,
          rules: {
            username: {
              required: true,
                regex: /^\S+$/ // Check has no whitespace
            },
            password: "required"
          }
        });

        var username = $('#username').val();
        var password = $('#password').val();

        if ($('#login_form').valid()) {
          _username = username;
          // Register user
          socket.emit('regist', { username: username, password: password });
          $('body').after('<div id="active_room" style="display:none;">' + MAIN_ROOM + '</div>');
          $('#profile').text(username);
        }
      }
    }
    ]
  });

