function createSensorItem(id, armState, settingId, automationId, contactId, deviceTypeId, deviceType, Description, householdId)
{
    var sensorItem = {};

    sensorItem.id = id;
    sensorItem.armState = armState;
    sensorItem.settingId = settingId;
    sensorItem.automationId = automationId;
    sensorItem.contactId = contactId;
    sensorItem.deviceTypeId = deviceTypeId;
    sensorItem.deviceType = deviceType;
    sensorItem.Description = Description;
    sensorItem.householdId = householdId;
  
    
    return sensorItem;
}

function createDeviceItem(id, Description, number){

    var deviceItem={};
    deviceItem.id = id;
    deviceItem.Description = Description;
    deviceItem.number = number;

    return deviceItem;
}
function createUserItem(id, username, password, householdId){
  
  var userItem = {};
  
  userItem.id = id;
  userItem.username = username;
  userItem.password = password;
  userItem.householdId = householdId;
  
  return userItem;
}

exports.createSensorItem = createSensorItem;
exports.createDeviceItem = createDeviceItem;
exports.createUserItem = createUserItem;
