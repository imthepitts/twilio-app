var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	var ACCOUNT_SID = '';
	var AUTH_TOKEN = '';
	var twilio = require('twilio');
	var capability = new twilio.Capability(ACCOUNT_SID, AUTH_TOKEN);

	capability.allowClientIncoming('zack');

	var token = capability.generate();

  res.render('index', { title: 'Twilio App', token: token });
});

module.exports = router;
