var express          = require('express');
var path             = require('path');
var favicon          = require('static-favicon');
var logger           = require('morgan');
var cookieParser     = require('cookie-parser');
var bodyParser       = require('body-parser');
var handlebars       = require('express-handlebars');
var expressValidator = require('express-validator');
var flash            = require('connect-flash');
var session          = require('express-session');
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var mongo            = require('mongodb');
var mongoose         = require('mongoose');
var mongoStore       = require('connect-mongo')({
	session: session
});
var config           = require('config');

var app              = express();

var http             = require('http').Server(app);
var io               = require('socket.io')(http);

mongoose.connect('mongodb://localhost/qna');

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
* Save login in session
* so that it's not nessecary to login every time the server 
* restarts.
*/
app.use(session({
    secret: 'QnA',
    saveUninitialized: false,
    resave: true,
    cookie: {
			secure: false,
			httpOnly: false,
            maxAge: 1000 * 60 * 60 * 24 * 7
    },
    name: 'QnA',
		secret: 'QnA',
		store: new mongoStore({
			url: "mongodb://127.0.0.1:27017",
			collection:"qna"
		})
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
// Validate user input
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root      = namespace.shift(),
            formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Using the flash middleware provided by connect-flash to store
// messages in session and displaying in templates
app.use(flash());

// Global variables, status messages
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg   = req.flash('error_msg');
    res.locals.error       = req.flash('error');
    res.locals.user        = req.user || null;
    next();
});

var routes      = require('./routes/index');
var users       =  require('./routes/users');
var discussions = require('./routes/discussions');
var questions   = require('./routes/questions');
var answers     = require('./routes/answers');

app.use('/', routes);
app.use('/users', users);
app.use('/discussions', discussions);
app.use('/questions', questions);
app.use('/answers', answers);





http.listen(3000, function () {
    console.log('listening on port 3000');
});
