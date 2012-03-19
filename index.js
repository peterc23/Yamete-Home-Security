var http = require('http');
var events = require('./Resources/events.js');
var static = require('node-static');
var socketio = require('socket.io');
var handler = require('./requestHandlers.js');

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
        handler.retrieveSensorStatus(data, function(Sensors){
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
  
  socket.on(events.TRIGGER_FIRE_ALARM, function (data) {
  console.log(data);
  console.log("jeff triggered the Fire alarm");
  if (data == null || typeof data == 'undefined'){
    return;
  }
  data.deviceTypeId = 1;
  handler.sensorTriggered(data); 
   
  });

  socket.on(events.TRIGGER_WATER_LEVEL, function(data) {
    console.log(data);
  console.log("jeff triggered the water alarm");
  });
  socket.on(events.CABINET_OPENED, function(data) {
    console.log(data);
  console.log("jeff triggered the cabinet alarm");
  });
  socket.on(events.RESIDENT_FELL, function(data) {
    console.log(data);
  console.log("jeff triggered the fall alarm");
  });
  socket.on(events.LOW_BATTERY, function(data) {
    console.log(data);
  console.log("jeff triggered the triggered lowBattery alarm");  
  });
  socket.on(events.TRIGGER_SENSOR, function(data) {
    console.log(data);
  console.log("jeff triggered the triggered sensor alarm");
  });
  socket.on(events.UPDATE_CHILD_POSITION, function(data) {
    console.log(data);
  console.log("jeff triggered the child position alarm");
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
      handler.armSystem(data, function() {
          fn();
      });
  });
  socket.on(events.DISARM_SYSTEM, function(data, fn) {
      console.log("disarm system");
      handler.disarmSystem(data, function() {
          fn();
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

});
