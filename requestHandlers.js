var dbSensors = require('./db/dbSensors.js');

function sensor(req, res){
//do somethi
}

function sensorTriggered(data){

};

function retrieveSensorStatus(data, callback){
dbSensors.checkState(data, function(sensorItem){
console.log("doneretrieve");
console.log(sensorItem);
callback(sensorItem);
});
}
exports.retrieveSensorStatus = retrieveSensorStatus;
exports.sensorTriggered = sensorTriggered;
exports.sensor = sensor;