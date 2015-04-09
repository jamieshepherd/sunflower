// Require
var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

// Make our two player connections
var player1 = null;
var player2 = null;

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

    // Set to player 1 or 2
    if(!player1) {
        player1 = socket.id;
        io.emit('client log', 'You are PLAYER 1');
        console.log('PLAYER 1 has joined the game ('+ socket.id +')');
    } else if(!player2) {
        player2 = socket.id;
        io.emit('client log', 'You are PLAYER 2');
        console.log('PLAYER 2 has joined the game ('+ socket.id +')');
    } else {
        io.emit('client log', 'You are DISCONNECTED');
        socket.disconnect();
    }

    // On event received, emit event to everyone
    socket.on('player event', function(msg) {
        io.emit('player event', msg);
    });

    // On log event, write to console
    socket.on('server log', function(msg) {
        console.log('[LOG]' + msg);
    });

    // When user disconnects, set game over
    socket.on('disconnect', function() {

        // Set player to null so someone else can join
        if(player1 == socket.id) {
            console.log('PLAYER 1 DISCONNECTED');
            player1 = null;
        }
        if(player2 == socket.id) {
            console.log('PLAYER 2 DISCONNECTED');
            player2 = null;
        }
    });

});


