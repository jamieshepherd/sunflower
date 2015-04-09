// Require
var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

app.use(express.static('public'));

// Routes
app.get('/', function(req, res){
    //res.sendFile(path.resolve('index.html'));
    res.sendFile('public/index.html', { root: __dirname });
});

// Set up a listener
http.listen(3000, function(){
    console.log('[SERVER] Listening on *:3000');
});

// Socket connection
io.on('connection', function(socket) {

    // Log that a user has connected
    console.log('[CONNECTED] A user has connected');

    // On event received, emit event to everyone
    socket.on('player event', function(msg) {
        io.emit('player event', msg);
        console.log('[PLAYER] ' + msg);
    });

    // On log event, write to console
    socket.on('log', function(msg) {
        console.log('[LOG]' + msg);
    });

    // When user disconnects, set game over
    socket.on('disconnect', function() {
        console.log('[QUIT] A user has disconnected');
    });

});


