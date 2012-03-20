var http = require('http');
var sys = require('sys');
var constants = require('./constants.js');
var smsified = require('smsified');


function sendSMS(destNum, msg){
if (typeof destNum === "undefined" || typeof msg === 'undefined')
	return;
var sms = new SMSified(constants.smsified.username, constants.smsified.password);
var options = {senderAddress: constants.smsified.senderAddress, address: destNum, message: msg};
console.log(options);
sms.sendMessage(options, function(result) {
  console.log(result);	       
});
}

exports.sendSMS = sendSMS;
