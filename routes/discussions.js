var express    = require('express');
var router     = express.Router();
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var http       = require('http').Server(express);
var io         = require('socket.io')(http);

var Discussion = require('../models/discussion');

var isAuthenticated = require('../helpers/authenticated');

/**
* Send to page to create new discussion
*/
router.get('/create', isAuthenticated, function (req, res) {
	res.render('create');
});

/**
* Getting the discussion detail page
* This shows the title, Message, user who started the discussion
* The questions and the awnsers
*/
router.get('/:id', isAuthenticated, function (req, res) {
	Discussion.findOne({_id: req.params.id})
		.populate('userId')
		.exec(function (err, doc) {
			console.log('err', err);
			console.log('doc', doc);
			if(doc) {
				res.render('discussion', {"title": doc.title, "message": doc.message, "userId": doc.userId, "data": doc.questions, discussionId: doc._id.toString()});
			} else {
				res.render("404");
			}
	});
});
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
* Creating a new discussion with the Discussion model
*/
var createDiscussion = function(discussion, callback) {
	var post = new Discussion(discussion);

	//save model to MongoDB
	post.save(function (err, room) {
	    if (err) {
			callback(err, null);
	    } else {
			callback(null, '/discussions/' + room.id);
	    }
	});
};

// POST /login gets urlencoded bodies
router.post('/create', urlencodedParser, function (req, res) {
	var discussion = {title: req.body.title, message: req.body.message, userId: req.user._id.toString()};

	createDiscussion(discussion, function(err, data) {
		if (err) {
			return err;
		} else {
			res.redirect(data);
		}
	});
});

module.exports = router;
