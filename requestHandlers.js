/*
<!-- ************HEADER***************
ECE 355 Security system, Group 23 khp2chan, jj3chen,jtgao
This is the request handler of the secruity panel.All calls are routed here form the main index.js, from here we dleegate the action to other clases such as db helpers and sms helpers.we analyze and return data to the repsective end points here.-->
*/
var dbSensors = require('./db/dbSensors.js');
var dbUsers = require('./db/dbUsers.js');
var dbDevices = require('./db/dbDevices.js');
var constants = require('./Resources/constants.js');
var events = require('./Resources/events.js');
var sms = require('./Resources/sms.js');

function sensor(req, res){
//do somethi
}

function sensorTriggered(data, callback){

console.log(data);
console.log(data.SensorId);
dbSensors.sensorTriggered(data.SensorId, function(err){
});
dbSensors.retrieveContactInfo(data.SensorId, function(contactInfo){
console.log(contactInfo);	
if (contactInfo || typeof contactInfo !== 'undefined'){
for(var i=0; i<contactInfo.length; i++){
	sms.sendSMS(contactInfo[i].number, contactInfo[i].Description+' has been triggered, Sensor Id:'+contactInfo[i].id);
}
}

dbSensors.getSensorInfo(data.SensorId, function(sensorInfo){
    callback(sensorInfo, contactInfo);
});

});
}

function retrieveSensorStatus(data, callback){
dbSensors.getHouseholdSensors(data, function(sensorItem){
console.log("doneretrieve");
console.log(sensorItem);
callback(sensorItem);
});
}


//Start of GUI handlers
function loginRequest(data, callback){
dbUsers.checkCredentials(data, function(result){

var userCredentials = {};
        console.log(data.password);
	console.log(result[0].password);
	if(data.password == result[0].password){
	  console.log("success");
	  userCredentials.success = true;	
	  userCredentials.username = result[0].username;
	  userCredentials.householdId = result[0].householdId;
	  userCredentials.userId = result[0].id;
	}else{
	  console.log("******FAIL*****");
	  userCredentials.success = false;
	}
	callback(userCredentials);
});
}

function armSystem(data, callback) {
    var houseid = data.houseid;
    var armstate = data.armstate;
    
    dbSensors.armSystem(houseid, constants.SYSTEM_STATE_ARMED, function(err) {
        if (!err) callback();
    });
}

function disarmSystem(data, callback) {
    var houseid = data.houseid;
    var armstate = data.armstate;
    
    dbSensors.armSystem(houseid, constants.SYSTEM_STATE_DISARMED, function(err) {
        if (!err) callback();
    });
}

function isSystemArmed(data, callback) {
    var houseid = data.houseid;

    dbSensors.getHouseholdSensors(houseid, function(sensors) {
        var i = 0;
        for (i=0;i<sensors.length;i++)
        {
            if (sensors[i].armState == constants.SYSTEM_STATE_DISARMED) 
            {
                callback(false);
                return;
            }
        }
        callback(true);
    });
}

function reportEmergency(data, callback){
  sms.sendSMS('2269722284', data.msg);
  callback();

}

function addNotificationDevice(data, callback){
  var devicenumber = data.number;
  var houseid = data.houseid;
  var owner = data.owner;
	 dbDevices.addNotificationDevice(owner, devicenumber, houseid, function(info){
	console.log(info);
		 callback(info);
  });
}

function overrideSensor(data, callback){
var sensorid = data.sensorid;

dbSensors.overrideSensor(sensorid, function(err){
if(!err)callback();
});


}

function updateLowBatteryStatus(sensorid, lowbattery){
    dbSensors.updateLowBatteryStatus(sensorid, lowbattery, function(err){
    });
}

function addSensor(data, callback){
    dbSensors.addSensor(data,function(err){
        callback();
    });
}

exports.addSensor = addSensor;
exports.updateLowBatteryStatus = updateLowBatteryStatus;
exports.isSystemArmed = isSystemArmed;
exports.armSystem = armSystem;
exports.disarmSystem = disarmSystem;
exports.loginRequest = loginRequest;
exports.retrieveSensorStatus = retrieveSensorStatus;
exports.sensorTriggered = sensorTriggered;
exports.addNotificationDevice = addNotificationDevice;
exports.reportEmergency = reportEmergency;
exports.overrideSensor = overrideSensor;
exports.sensor = sensor;
