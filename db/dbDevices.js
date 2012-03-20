var client = require('./dbGeneral.js');
var properties = require('../Resources/properties.js');
var factory = require('./factory.js');

function addNotificationDevice(owner, devicenumber, houseid, callback){
    
     client.executeInsertSingleQuery('INSERT INTO '+properties.notifyDevices+' (deviceId, deviceOwner, number, houseid) VALUES(?, ? ,?, ?)', ['1', owner, devicenumber, houseid], function(userInfo){
	     console.log(userInfo);
     callback(userInfo);
     });
}
/*
function updateTriggerSensor(data, callback){
    if (data == null || typeof data == 'undefined'){ callback(null); return}
    client.executeUpdateSingleQuery(
    'UPDATE '+properties.householdTable+' SET armState = 
    );
}*/

function createDeviceFromResult(result)
{
    if (result == null || typeof result == 'undefined') { callback(null); return; }

    return factory.createDeviceItem(result.id, result.deviceId, result.deviceOwner, result.number, result.confirmed);
}


exports.addNotificationDevice = addNotificationDevice;
