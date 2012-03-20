var http = require('http');
var events = require('./Resources/events.js');
var static = require('node-static');
var socketio = require('socket.io');
var handler = require('./requestHandlers.js');
//var sms = require('./Resources/sms.js');

var sensorfile = new(static.Server)('.');
var httpServer = http.createServer(function (request, response) {
    console.log("rahhh");
	request.addListener('end', function () {
	console.log("sigh");
    	    sensorfile.serve(request, response);
    });
}).listen(1234);


var io = socketio.listen(httpServer);


io.set('log level', 1);
io.sockets.on('connection', function (socket) {
    console.log("new Client connected");

    socket.on(events.DEVICE_CONNECTED, function (data) {
        console.log('device connected');
        console.log(data);
        handler.retrieveSensorStatus(data.houseId, function(Sensors){
            // emit sensor status
            socket.emit(events.DEVICE_STATUS, Sensors);
        });
    });
    /*
  Device Types: 
  1 = fire alarm
  2 = water level
  3 = cabinet
  4 = fall sensor
  5 = low batt
  6 = door
  7 = window
  8 = motion
  */
  function houseStatus(houseId){
    handler.retrieveSensorStatus(houseId, function(Sensors){
       console.log("***************"+ Sensors);
       socket.broadcast.emit(events.DEVICE_STATUS, Sensors);
    });

  }

  socket.on(events.TRIGGER_FIRE_ALARM, function (data) {
  console.log(data);
  console.log("jeff triggered the Fire alarm");
  //sms.sendSMS();
  if (data == null || typeof data == 'undefined'){
    return;
  }
  handler.sensorTriggered(data, function(house){
    houseStatus(house.householdId);

  }); 
  });

  socket.on(events.TRIGGER_WATER_LEVEL, function(data) {
    console.log(data);
  console.log("jeff triggered the water alarm");
  handler.sensorTriggered(data, function(house){
    houseStatus(house.householdId);			 
  }); 
  });

  socket.on(events.CABINET_OPENED, function(data) {
    console.log(data);
  console.log("jeff triggered the cabinet alarm");
  handler.sensorTriggered(data, function(house){
  houseStatus(house.householdId);
  }); 
  });

  socket.on(events.RESIDENT_FELL, function(data) {
    console.log(data);
    console.log("jeff triggered the fall alarm");
  handler.sensorTriggered(data, function(house){
    houseStatus(house.householdId);			 
  });
  });

  socket.on(events.LOW_BATTERY, function(data) {
    console.log(data);
  console.log("jeff triggered the triggered lowBattery alarm");  
  handler.sensorTriggered(data, function(house){
    houseStatus(house.householdId);			 
  }); 
  });

  socket.on(events.TRIGGER_SENSOR, function(data) {
  	  console.log(data);
  console.log("jeff triggered the triggered sensor alarm");
  handler.sensorTriggered(data, function(house){
    houseStatus(house.householdId);
  }); 
  });

  socket.on(events.UPDATE_CHILD_POSITION, function(data) {
    console.log(data);
  console.log("jeff triggered the child position alarm");
  handler.sensorTriggered(data, function(house){
   houseStatus(house.householdId);			 
  }); 
  });
  socket.on(events.CAM_FEED, function(data){
    socket.broadcast.emit(events.VIDEO_FEED, data);
  });
  
  socket.on(events.GET_ARM_STATUS, function(data, fn) {
      console.log("Getting ARM status");
      handler.isSystemArmed(data, function(isArmed) {
          fn({isArmed:isArmed});
      });
  });
  socket.on(events.ARM_SYSTEM, function(data, fn) {
      console.log("arm system");
     var houseid = data.houseid;
      handler.armSystem(data, function() {
          fn();
    houseStatus(houseid);			 
    });
  });
  socket.on(events.DISARM_SYSTEM, function(data, fn) {
      console.log("disarm system");
     var houseid = data.houseid;
      handler.disarmSystem(data, function() {
          fn();

     houseStatus(houseid);			 
    });
  });
 
 //START OF GUI 
  var clientGUI = {};
  socket.on(events.SEND_USRNAME_PWD, function (data) {
  console.log('login request');
  console.log(data);
  data.socketid = socket.id;
  handler.loginRequest(data, function(response){
	console.log(response);
	  io.sockets.socket(data.socketid).emit(events.USER_CREDENTIALS, response);		      
		      
  });
   });
  socket.on(events.ADD_NOTIFICATION_DEVICE, function(data, fn){
	console.log("HI THERE" + data);
	console.log(data);
	handler.addNotificationDevice(data, function(response){
	console.log(response);
		fn();
    }); 
  });
});
