/*
<!-- ************HEADER***************
ECE 355 Security system, Group 23 khp2chan, jj3chen,jtgao
This is the SMS helper file we use SMSIFIED to send SMS messages. and we interact with SMSIFIED by doing HTTP POSTS requests to the SMSIFIED server.-->
*/
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
