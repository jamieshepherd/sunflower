// Check that we've loaded our client
console.log("Process.js loaded");

// Set variables
var socket    = io();
var player    = null;

// When we receive what player we are, set it globally
socket.on('set player', function(msg) {
    player = msg.toUpperCase();
    console.log("You are: " + player);
});

// When we receive a player event, find out what it is
socket.on('player event', function(msg) {
    // Take the command and set a storyline variable for it
    storyline.SetVar(msg,1);
    // Storyline will see variable is changed to 1
    // Storyline will do an action, and then switch it to 0
});

socket.on('client log', function(msg) {
    console.log(msg);
});
// On document ready
$(function() {

    // When a function has keyed down
    $(document).keydown(function(e) {

        // Figure out the key, create an action, send to Mozart
        switch(e.which) {
            case 37:
                socket.emit('player event', player+"_MOVE_LEFT");
                break;
            case 39:
                socket.emit('player event', player+"_MOVE_RIGHT");
                break;
            case 38:
                socket.emit('player event', player+"_MOVE_UP");
                break;
            case 40:
                socket.emit('player event', player+"_MOVE_DOWN");
                break;
            case 90:
                socket.emit('player event', player+"_ATTACK_PRIMARY");
                break;
            case 88:
                socket.emit('player event', player+"_ATTACK_SECONDARY");
                break;
        }

    });

});
