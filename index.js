var app = require('express')();
var http = require('http').Server(app);
var httpk = require('http');
var io = require('socket.io')(http);

var express = require('express');

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


//usb or wifi connection to arduino

app.get('/about', function(req, res){
  res.sendFile(__dirname + '/about.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});