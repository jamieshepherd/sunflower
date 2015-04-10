var socket = io();
var player = null;

// When we receive what player we are, set it globally
socket.on('set player', function(msg) {
    player = msg.toUpperCase();
    console.log("You are: " + player);
});

// When we receive a player event, find out what it is
socket.on('player event', function(msg) {
    switch(msg) {
        case 37:
            console.log(player+"_MOVE_LEFT");
            break;
        case 39:
            console.log(player+"_MOVE_RIGHT");
            break;
        case 38:
            console.log(player+"_MOVE_UP");
            break;
        case 40:
            console.log(player+"_MOVE_DOWN");
            break;
        case 90:
            console.log(player+"_ATTACK_PRIMARY");
            break;
        case 88:
            console.log(player+"_ATTACK_SECONDARY");
            break;
    }
});

socket.on('client log', function(msg) {
    console.log(msg);
});
// On document ready
$(function() {

    // When a function has keyed down
    $(document).keydown(function(e) {
        // Send the key to Mozart
        socket.emit('player event', e.which);
    });

});
