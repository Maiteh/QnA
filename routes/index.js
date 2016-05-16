
var express    = require('express');
var router     = express.Router();
var mongoose   = require('mongoose');
var Discussion = require('../models/discussion');

var isAuthenticated = require('../helpers/authenticated');

router.get('/', isAuthenticated, function(req, res){
	Discussion.find( function(err, docs) {
       	res.render('index', {data: docs});
    });
});

module.exports = router;