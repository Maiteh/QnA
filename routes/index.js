
var express    = require('express');
var router     = express.Router();
var mongoose   = require('mongoose');
var Discussion = require('../models/discussion');

var isAuthenticated = require('../helpers/authenticated');
var geo             = require('../helpers/geo');


router.get('/', isAuthenticated, function(req, res){
    //Discussion.findOne({location: locationname})
    //    .exec(function (err, docs) {
     // res.render('index', {data: docs});
   // });
    
    
	Discussion.find( function(err, docs) {
       	res.render('index', {data: docs});
    });
});



module.exports = router;