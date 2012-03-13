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

exports.createSensorItem = createSensorItem;
