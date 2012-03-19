var dbSensors = require('./db/dbSensors.js');
var dbUsers = require('./db/dbUsers.js');
var constants = require('./Resources/constants.js');

function sensor(req, res){
//do somethi
}

function sensorTriggered(data){

}

function retrieveSensorStatus(data, callback){
dbSensors.checkState(data, function(sensorItem){
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

exports.isSystemArmed = isSystemArmed;
exports.armSystem = armSystem;
exports.disarmSystem = disarmSystem;
exports.loginRequest = loginRequest;
exports.retrieveSensorStatus = retrieveSensorStatus;
exports.sensorTriggered = sensorTriggered;
exports.sensor = sensor;
