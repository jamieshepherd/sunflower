var socket = io();

// When we receive a player event, find out what it is
socket.on('player event', function(msg){
    switch(msg) {
        case 37:
            console.log("PLAYER1_MOVE_LEFT");
            break;
        case 39:
            console.log("PLAYER1_MOVE_RIGHT");
            break;
        case 38:
            console.log("PLAYER1_MOVE_UP");
            break;
        case 40:
            console.log("PLAYER1_MOVE_DOWN");
            break;
        case 90:
            console.log("PLAYER1_ATTACK_PRIMARY");
            break;
        case 88:
            console.log("PLAYER1_ATTACK_SECONDARY");
            break;
    }
});

// On document ready
$(function() {

    // When a function has keyed down
    $(document).keydown(function(e) {
        // Send the key to Mozart
        socket.emit('player event', e.which);
    });

});
