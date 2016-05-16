var express    = require('express');
var router     = express.Router();
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var http       = require('http').Server(express);
var io         = require('socket.io')(http);

var Discussion = require('../models/discussion');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// POST for answers
router.post('/:id', urlencodedParser, function (req, res) {
	var answer = {
		answer: req.body.answer
	};

	Discussion.update({_id: req.params.id, "questions._id": req.body.questionId}, {$push: {'questions.$.answers': answer}})
		.exec(function(err, update) {
			Discussion.findOne({_id: req.params.id})
				.exec(function(err, discussion) {
					if (err) {
						return err;
					} else {
						res.redirect('/discussions/' + req.params.id);
					}
				});
		});
});

module.exports = router;
