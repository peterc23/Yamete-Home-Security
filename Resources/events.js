(function(exports){
   
   exports.SERVER_URL = 'http://192.168.1.8:1234';

   //****Functions for Sensors and Devices
   exports.SENSOR_ID = 'SensorId';
   exports.UPDATE_CHILD_POSITION = 'UpdateChildPosition';
     exports.LATITUDE = 'latitude';
     exports.LONGITUDE = 'longitude';
   exports.TRIGGER_FIRE_ALARM = 'TriggerFireAlarm';
   exports.TRIGGER_WATER_LEVEL = 'TriggerWaterLevelSensor';
   exports.CABINET_OPENED = 'CabinetOpened';
     exports.DATE_TIME = 'datetime';
   exports.RESIDENT_FELL = 'ResidentFell';
   exports.LOW_BATTERY = 'LowBattery';
   exports.DEVICE_CONNECTED = 'deviceConnected';
   exports.DEVICE_STATUS = 'deviceStatus';
   
   //****Sensor Types
   exports.TRIGGER_SENSOR = 'TriggerSensor';
     exports.SENSOR_TYPE = 'SensorType';
     
   //****Shared functions.
   exports.ARM_SYSTEM = 'ArmSystem';
   exports.DISARM_SYSTEM = 'DisarmSystem';
   
   
   //****Functions for GUI
   exports.CHILD_FOUND = 'ChildFound';
     exports.CHILD_NAME = 'ChildName';
   exports.USER_CREDENTIALS = 'UserCredentials';
   exports.SET_CHILD_RANGE = 'SetChildRange';
   exports.SET_MIN_WEIGHT = 'SetMinimumWeight';
   exports.SET_CABINET_TIME = 'SetCabinetOpenTime';
   exports.VIEW_LOGS = 'ViewLogs';
   exports.VIEW_CAMERA = 'ViewCamera';
   exports.TEST_SYSTEM = 'TestSystem';
   exports.ADD_NOTIFICATION_DEVICE = 'AddNotificationDevice';
   exports.REPORT_EMERGENCY = 'ReportEmergency';
   exports.SEND_USRNAME_PWD = 'SendUserNamePassword';  
   exports.VIDEO_FEED = 'SendVideoFeed';
   exports.CAM_FEED = "SendCamFeed";   
})(typeof exports === 'undefined'? this['events']={}: exports);
