var app = require('express')();
var http = require('http').Server(app);
var httpk = require('http');
var io = require('socket.io')(http);
var express = require('express');
var nsp = io.of('/channel1');
/*
var SerialPort = require("serialport");
var serialport = new SerialPort("COM3");
//var finaldata = [];
//var interval = undefined;




 serialport.on('open', function(){
  	console.log('Serial Port Opend');
  	
  	serialport.on('data', function(data){
      console.log(data[0]);

     // finaldata.push(data[0]);

    nsp.emit('live-data', data[0]);
  });
});
*/


var SerialPort = require("serialport");
var portName = 'COM4';
var receivedData = "";
var abc;
 

 var buffer = '';

function process(data){
  var separatorIndex;
  while((separatorIndex = data.indexOf(',')) !== -1){
    send(buffer + data.substr(0, separatorIndex));
    buffer = '';
    data = data.substr(separatorIndex + 1);
  }
  buffer += data;
}

function send(data){
  console.log(data);
}


  serialPort = new SerialPort(portName, {
      baudrate: 9600,
      // defaults for Arduino serial communication
      dataBits: 8, 
      parity: 'none', 
      stopBits: 1, 
      flowControl: false
  });
 /*
 data  =["101","65", "65"]
 */


  serialPort.on("open", function () {
    console.log('oSerial Communication begins.... ');
  

  // Listens to incoming data
  serialPort.on('data', function(data) { 
    
    receivedData += data.toString();
    console.log(data.toString());
    // while (data != '\r'){

    // } 

    // if (receivedData === '\n'){
          
      //receivedData.split("\r?\n")
      //console.log(receivedData);
      //receivedData = '';  
    // }
        
        //console.log(receivedData);

          //receivedData += data.toString();
          //console.log(data.toString());
          //process(data.toString());
          /*
          process('123');
          process('456;789;123;456;789');
          process('1');
          process('00');
          process('1;');*/
          //process(receivedData);
          //abc = receivedData.replace(/[^0-9;]/gm, '').replace(/;/g, '\r\n');

          //before ="1\n09;\n8\n9;\n10\n9;\n1\n00;2\n0;"
          //console.log("before: ",receivedData);
          //console.log("after: ",abc);

          //console.log(abc);
          //console.log(receivedData);
          //result = receivedData.replace(/(;\n)|(\n)/g, '$1');

          //console.log(result);
          nsp.emit('live-data', receivedData);
          //console.log(data.toString());
      
         // send the incoming data to browser with websockets.
    // socketServer.emit('update', sendData);
    });  
  });  
/*
var SerialPort = require("serialport");
serialport.on('open', function(){
  console.log('Serial Port Opend');
  serialport.on('data', function(data){
      console.log(data[0]);
  });
});
*/





nsp.on('connection', function(socket) {
//	console.log('1 Browser Tab connected');

	 

   //nsp.emit('live-data', finaldata); 
    socket.on('disconnect', function() {
     
    console.log('1 Browser Tab disconnected');
    });
});


app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use('/assets', express.static(__dirname + '/node_modules/bootstrap/dist/asset')); // redirect JS jQuery

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/about', function(req, res){
  res.sendFile(__dirname + '/about.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


