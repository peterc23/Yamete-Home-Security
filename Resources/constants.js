(function(exports){
    
    exports.URL = 'http://localhost:1234';
    
    // arm and disarm
    exports.HOME_SECURITY_SYSTEM_ID = 0;
    exports.FAMILY_SAFETY_SYSTEM_ID = 1;
    
    exports.SYSTEM_STATE_ARMED = 1;
    exports.SYSTEM_STATE_DISARMED = 0;
   
})(typeof exports === 'undefined'? this['constants']={}: exports);