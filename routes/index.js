var express = require('express');
var router = express.Router();

var ACCOUNT_SID = '';
var AUTH_TOKEN = '';
var twilio = require('twilio');
var client = twilio(ACCOUNT_SID, AUTH_TOKEN);

router.get('/', function(req, res, next) {

	var capability = new twilio.Capability(ACCOUNT_SID, AUTH_TOKEN);

	capability.allowClientIncoming('zack');
	capability.allowClientOutgoing('');

	var token = capability.generate();

  res.render('index', { title: 'Twilio App', token: token });
});

router.post('/sms', function(req, res, next) {	
	console.log(req.body);
	client.sendMessage({

	    to: req.body.to, 
	    from: '', 
	    body: req.body.body 

	}, function(err, responseData) { 

	    if (!err) { 
	        console.log(responseData.from); 
	        console.log(responseData.body); 
	    } else {
	    	console.log(JSON.stringify(err));
	    }
	});

    res.end();
});

module.exports = router;
