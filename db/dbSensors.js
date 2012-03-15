var client = require('./dbGeneral.js');
var properties = require('../Resources/properties.js');
var factory = require('./factory.js');

function checkState(data, callback){
     if (data == null || typeof data == 'undefined'){ callback(null); return}
     client.executeFindMultipleQuery('SELECT * FROM '+properties.householdTable+' WHERE householdId = ?', [data.houseId], createSensorFromResult, function(houseInfo){
     console.log(houseInfo);
     callback(houseInfo);
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


exports.checkState = checkState;
