var express = require('express');
var router = express.Router();

var ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
var AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
var TWILIO_NUMBER = process.env.TWILIO_NUMBER;
var TWILIO_APP = process.env.TWILIO_APP;

var twilio = require('twilio');
var client = twilio(ACCOUNT_SID, AUTH_TOKEN);

router.get('/', function(req, res, next) {

	var capability = new twilio.Capability(ACCOUNT_SID, AUTH_TOKEN);

	capability.allowClientIncoming('zack');
	capability.allowClientOutgoing(TWILIO_APP);

	var token = capability.generate();

  res.render('index', { title: 'Twilio App', token: token });
});

router.post('/sms', function(req, res, next) {	
	console.log(req.body);
	client.sendMessage({

	    to: req.body.to, 
	    from: TWILIO_NUMBER, 
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

router.post('/message-test', function(req, res, next) {	

	var message = {
	    to: req.body.to, 
	    from: TWILIO_NUMBER, 
	    body: req.body.body,
	}

	if (req.body.mediaUrl.length){
		message.mediaUrl = req.body.mediaUrl;
	}

	client.messages.post(message, function(err, responseData) { 

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
