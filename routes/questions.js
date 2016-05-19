var express    = require('express');
var router     = express.Router();
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var http       = require('http').Server(express);
var io         = require('socket.io')(http);

var Discussion      = require('../models/discussion');
var isAuthenticated = require('../helpers/authenticated');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var createQuestion = function(discussionId, question, callback) {
	Discussion.update({_id: discussionId}, {$push: {questions: question}})
		.exec(function(err, update) {
			Discussion.findOne({_id: discussionId})
				.exec(function(err, discussion) {
					if (err) {
						callback(err, null);
					} else {
						callback(null, '/discussions/' + discussionId);
					}
				});
		});
};

module.exports.createQuestion = createQuestion;

// POST for answers
router.post('/:id', urlencodedParser, function (req, res) {
	var question = {
		question: req.body.question
	};
	
	createQuestion(req.params.id, question, function(err, data) {
		if (err) {
			return err;
		} else {
			res.redirect(data);
		}
	});
});

module.exports = router;


