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
    
    client.executeUpdateSingleQuery('UPDATE Household SET armstate=? WHERE householdId=?', [armstate, houseid], function(err){
        callback(err);
    });
}

function getHouseholdSensors(houseid, callback){
    if (houseid == null || typeof houseid == 'undefined') {callback(null); return; }
    
    client.executeFindMultipleQuery('SELECT * FROM Household WHERE householdId=?',[houseid], createSensorFromResult, function(houseInfo) {
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

exports.getHouseholdSensors = getHouseholdSensors;
exports.checkState = checkState;
exports.armSystem = armSystem;
