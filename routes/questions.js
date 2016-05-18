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

// POST for question
router.post('/:id', urlencodedParser, function (req, res) {
	var question =  {
		question: req.body.question
	};
	Discussion.update({_id: req.params.id}, {$push: {questions: question}})
		.exec(function (err, update) {
			if (err) {
				return err;
			} else {
				Discussion.findOne({_id: req.params.id})
					.exec(function (err, discussion) {
						if (err) {
							return err;
						} else {
							res.redirect('/discussions/' + req.params.id);
						}
					});
			}
		});
});

module.exports = router;
