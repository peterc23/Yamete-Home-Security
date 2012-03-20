(function(exports){
    //This page defins shared constants require dfor different modules.
	//the URL specifies the url which the server is running
    exports.URL = 'http://192.168.1.8:1234';
    
    // arm and disarm
    exports.HOME_SECURITY_SYSTEM_ID = 0;
    exports.FAMILY_SAFETY_SYSTEM_ID = 1;
    
    exports.SYSTEM_STATE_ARMED = 1;
    exports.SYSTEM_STATE_DISARMED = 0;


   //SMS info
  
    exports.smsified = {
     username : 's4petah',
     password : 'khp2chan',
     senderAddress : '5712101222'
};	
})(typeof exports === 'undefined'? this['constants']={}: exports);
