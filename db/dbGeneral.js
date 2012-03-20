/*
<!-- ************HEADER***************
ECE 355 Security system, Group 23 khp2chan, jj3chen,jtgao
This is the General Database Helper files, we use the node.js mysql module to interact with the mysql dtabase, we execute normal sql statements to interact with them.
These functions are called from the specific table helper files e.g. dbUsers, dbSensors and dbDevices).-->
*/
var mysql = require('mysql');
var properties = require('../Resources/properties.js');

var client = mysql.createClient({
  host: properties.DB_HOST,
  port: properties.DB_PORT,
  database: properties.DB_SERVERNAME,
  user: properties.DB_USERNAME,
  password: properties.DB_PW,
});

function executeFindSingleQuery(statement, parameters, builder, callback)
{
  client.query(
    statement, parameters, function(err, result, fields){
        if (err) {console.log(err); callback(null); }
        console.log("data found");
        console.log(result);
        
        //client.end();
        if (callback) callback(result);
    });
}

function executeFindMultipleQuery(statement, parameters, builder, callback)
{
    console.log("executing find multiple query statement: "+statement+", with parameters: "+parameters);
    client.query(
        statement, parameters, function(err, results, fields) {
            if (err) { console.log(err); callback(null); }
            console.log("data found");
            console.log(results);

           // client.end();
            if (callback) callback(buildFromMultipleResult(results, builder));
        }
    );
}

function executeUpdateSingleQuery(statement, parameters, callback)
{
    console.log("executing update query statement: "+statement+", with parameters: "+parameters);
    client.query(statement, parameters, function (err, info) {
            if (err) { console.log(err); callback(err); }
            console.log('update successful');
            console.log(info);
            //client.end();
            if (callback) callback(err);
        }
    );
}

function executeInsertSingleQuery(statement, parameters, callback)
{
    console.log("executing inesrt single query statement: "+statement+", with parameters: "+parameters);
    client.query(statement, parameters, function (err, info) {
        if (err) { console.log(err); callback(err); }
            console.log('insert successful');
            console.log(info);
            //client.end();
            if (callback) callback(info);
        }
    );
}

function buildFromMultipleResult(results, builder)
{
    if (builder == null || results == null || typeof results == 'undefined' || results.length == 0) return null;

    var list = [];

    for (var i = 0; i < results.length; i++)
    {
        list.push(builder(results[i]));
    }

    return list;
}

exports.client = client;
exports.executeFindSingleQuery = executeFindSingleQuery;
exports.executeFindMultipleQuery = executeFindMultipleQuery;
exports.executeUpdateSingleQuery = executeUpdateSingleQuery;
exports.executeInsertSingleQuery = executeInsertSingleQuery;

