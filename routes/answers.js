var express    = require('express');
var router     = express.Router();
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var http       = require('http').Server(express);
var io         = require('socket.io')(http);

var Discussion = require('../models/discussion');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var createAnswer = function(discussionId, questionId, answer, callback) {
	Discussion.update({_id: discussionId, "questions._id": questionId}, {$push: {'questions.$.answers': answer}})
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

module.exports.createAnswer = createAnswer;

// POST for answers
router.post('/:id', urlencodedParser, function (req, res) {
	var answer = {
		answer: req.body.answer
	};
	
	createAnswer(req.params.id, req.body.questionId, answer, function(err, data) {
		if (err) {
			return err;
		} else {
			res.redirect(data);
		}
	});
});

module.exports = router;
