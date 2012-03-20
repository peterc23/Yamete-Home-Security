/*
<!-- ************HEADER***************
ECE 355 Security system, Group 23 khp2chan, jj3chen,jtgao
This is the dbUsers file. used to interact with the users table.-->
*/
var client = require('./dbGeneral.js');
var properties = require('../Resources/properties.js');
var factory = require('./factory.js');

function checkCredentials(data, callback){
     if (data == null || typeof data == 'undefined'){ callback(null); return}
     client.executeFindSingleQuery('SELECT * FROM '+properties.usersTable+' WHERE username = ? LIMIT 1', [data.usrname], createUserFromResult, function(userInfo){
     console.log("rahh");
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

function createUserFromResult(result)
{
    if (result == null || typeof result == 'undefined') { callback(null); return; }

    return factory.createUserItem(result.id, result.username, result.password, result.householdId);
}


exports.checkCredentials = checkCredentials;
