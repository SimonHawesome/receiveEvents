//Express initializes 'app' to be a function handler that can be supplied to an HTTP server (line 2)
var app = require('express')();
var http = require('http').Server(app);
//initialize new instance of 'socket.io' by passing http server object
var io = require('socket.io')(http);

var connectionStatus = false;
var counter = 0;

// We define a route handler '/' that gets called when we hit our website home.
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//Listen on the 'connection' event for incoming sockets, and log it to the console
io.on('connection', function(socket){

	socket.on('pan left', function(msg){
		io.emit('pan left', msg);
	});

	socket.on('pan right', function(msg){
		io.emit('pan right', msg);
	});

	socket.on('tap', function(msg){
		io.emit('tap', msg);
	});

	socket.on('press', function(msg){
		io.emit('press', msg);
	});

});


//We make the http server listen on port 3000
http.listen(3000, function(){
	console.log('listening on *:3000');
})
