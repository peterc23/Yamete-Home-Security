var dbSensors = require('./db/dbSensors.js');
var dbUsers = require('./db/dbUsers.js');
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
exports.loginRequest = loginRequest;
exports.retrieveSensorStatus = retrieveSensorStatus;
exports.sensorTriggered = sensorTriggered;
exports.sensor = sensor;
