/*
<!-- ************HEADER***************
ECE 355 Security system, Group 23 khp2chan, jj3chen,jtgao
This is the db Sensors portion of the db actions. this file interacts with the sensors table.-->
*/

var client = require('./dbGeneral.js');
var properties = require('../Resources/properties.js');
var factory = require('./factory.js');

function checkState(data, callback){
     if (data == null || typeof data == 'undefined'){ callback(null); return; }
     client.executeFindMultipleQuery('SELECT * FROM '+properties.householdTable+' WHERE householdId = ?', [data.houseId], createSensorFromResult, function(houseInfo){
         callback(houseInfo);
     });
}

function armSystem(houseid, armstate, callback){
    if (houseid == null || typeof houseid == 'undefined' || armstate == null || typeof armstate == 'undefined'){ callback(null); return; }
    
    client.executeUpdateSingleQuery('UPDATE Household SET armstate=? WHERE householdId=?', [armstate, houseid], function(errr){
        callback(errr);
    });
}
function overrideSensor(sensorid, callback){
    if (sensorid == null || typeof sensorid == 'undefined'){callback(null); return; }

    client.executeUpdateSingleQuery('Update '+properties.householdTable+' SET triggered=? WHERE id=?', ['0', sensorid], function(err){
	callback(err);
    });
}

function getHouseholdSensors(houseid, callback){
    if (houseid == null || typeof houseid == 'undefined') {callback(null); return; }
    
    client.executeFindMultipleQuery('SELECT * FROM Household WHERE householdId=?',[houseid], createSensorFromResult, function(houseInfo) {
        callback(houseInfo);
    });
}

function sensorTriggered(sensorid, callback){
    if (sensorid == null || typeof sensorid == 'undefined') {callback(null); return; }
    console.log('grr'+sensorid);
    client.executeUpdateSingleQuery('UPDATE '+properties.householdTable+' SET triggered=? WHERE id=?',['1', sensorid], function(err){
		console.log(err);
 	    callback(err);
    });
}
/*
function updateTriggerSensor(data, callback){
    if (data == null || typeof data == 'undefined'){ callback(null); return}
    client.executeUpdateSingleQuery(
    'UPDATE '+properties.householdTable+' SET armState = 
    );
}*/

function createSensorFromResult(result)
{
    if (result == null || typeof result == 'undefined') { callback(null); return; }

    return factory.createSensorItem(result.id, result.armState, result.settingId, result.automationId, result.contactId, result.deviceTypeId, result.deviceType, result.Description, result.householdId);
}
function createDeviceResult(result){
  return factory.createDeviceItem(result.deviceTypeId, result.Description, result.number);
}

function retrieveContactInfo(sensorid, callback){
  if (sensorid == null || typeof sensorid == 'undefined') {callback(null); return; }

  client.executeFindMultipleQuery('SELECT * FROM '+properties.householdTable+' JOIN '+properties.notifyDevices+' ON '+properties.householdTable+'.householdId = '+properties.notifyDevices+'.houseid WHERE '+properties.householdTable+'.id=?', [sensorid], createDeviceResult, function(contactInfo){
console.log("hihihihihihihihi");
       	  callback(contactInfo);
  });
}

exports.getHouseholdSensors = getHouseholdSensors;
exports.checkState = checkState;
exports.armSystem = armSystem;
exports.retrieveContactInfo = retrieveContactInfo;
exports.overrideSensor = overrideSensor;
exports.sensorTriggered = sensorTriggered;
