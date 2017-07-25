var app = require('express')();
var http = require('http').Server(app);
var httpk = require('http');
var io = require('socket.io')(http);
var express = require('express');
var nsp = io.of('/channel1');

var SerialPort = require("serialport");
var serialport = new SerialPort("COM4");
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



nsp.on('connection', function(socket) {
	console.log('1 Browser Tab connected');

	 

   //nsp.emit('live-data', finaldata); 
    socket.on('disconnect', function() {
     
    console.log('1 Browser Tab disconnected');
    });
});


app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/about', function(req, res){
  res.sendFile(__dirname + '/about.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


