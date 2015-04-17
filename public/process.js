// Check that we've loaded our client
console.log("Process.js loaded");

// Set variables
var socket    = io();
var player    = null;
var PLAYER1_POS = 40;
var PLAYER2_POS = 1240;

// When we receive what player we are, set it globally
socket.on('set player', function(msg) {
    player = msg.toUpperCase();
    console.log("You are: " + player);
});

// When we have two players, server let's us know game is ready
socket.on('game ready', function(msg) {
    console.log("got game ready event");
    if(msg == true) {
        setTimeout(function() {
            storyline.SetVar("GAME_READY",true);
            PLAYER1_POS = storyline.GetVar("PLAYER1_POS");
            PLAYER2_POS = storyline.GetVar("PLAYER2_POS");
        }, 12000);
    } else {
     storyline.SetVar("GAME_READY",false);
    }
});

// When we receive a player event, find out what it is
socket.on('player event', function(msg) {

    if(msg == "PLAYER1_MOVE_UP") {
        storyline.SetVar("PLAYER1_MOVE_DOWN", false);
    }
    if(msg == "PLAYER2_MOVE_UP") {
        storyline.SetVar("PLAYER2_MOVE_DOWN", false);
    }


    storyline.SetVar(msg, true);
    if(msg != "PLAYER1_MOVE_DOWN" && msg != "PLAYER2_MOVE_DOWN" ) {
        storyline.SetVar(msg, false);
    }
    /*
    if(storyline.GetVar("PLAYER1_MOVE_DOWN") == false) {
        storyline.SetVar(msg, false)
    }
    if(msg != "PLAYER1_MOVE_DOWN" && msg != "PLAYER2_MOVE_DOWN" ) {
        storyline.SetVar(msg, false);
    }
    */
    checkHit(msg);
});

socket.on('animation event', function(msg) {
    storyline.SetVar(msg, true);
});

socket.on('cancel animation event', function(msg) {
    storyline.SetVar(msg, false);
});

function checkHit(msg) {
    PLAYER1_POS = storyline.GetVar("PLAYER1_POS");
    PLAYER2_POS = storyline.GetVar("PLAYER2_POS");
    console.log(PLAYER1_POS);
    console.log(PLAYER2_POS);
    //320 - 120
    var HITAREA = PLAYER2_POS - PLAYER1_POS;
    if(msg == "PLAYER1_ATTACK_PRIMARY" ||
       msg == "PLAYER2_ATTACK_PRIMARY" ||
       msg == "PLAYER1_ATTACK_SECONDARY" ||
       msg == "PLAYER2_ATTACK_SECONDARY" ) {
        if(HITAREA <= 320 && HITAREA >= 120) {
            console.log("THIS SHOULD BE A HIT");
            switch(msg) {
                case "PLAYER1_ATTACK_PRIMARY":
                    if(storyline.GetVar("PLAYER2_MOVE_DOWN") == false) {
                        storyline.SetVar("PLAYER2_HEALTH", storyline.GetVar("PLAYER2_HEALTH") - 2);
                    }
                    break;
                case "PLAYER2_ATTACK_PRIMARY":
                    if(storyline.GetVar("PLAYER1_MOVE_DOWN") == false) {
                        storyline.SetVar("PLAYER1_HEALTH", storyline.GetVar("PLAYER1_HEALTH") - 2);
                    }
                    break;
                case "PLAYER1_ATTACK_SECONDARY":
                    storyline.SetVar("PLAYER2_HEALTH", storyline.GetVar("PLAYER2_HEALTH") - 1);
                    break;
                case "PLAYER2_ATTACK_SECONDARY":
                    storyline.SetVar("PLAYER1_HEALTH", storyline.GetVar("PLAYER1_HEALTH") - 1);
                    break;
            }
        }
    }
}

socket.on('client log', function(msg) {
    console.log(msg);
});
// On document ready
$(function() {

    // When player has keyed down
    $(document).keydown(function(e) {
        // Figure out the key, create an action, send to Mozart
        switch(e.which) {
            case 37:
                if(storyline.GetVar(player+"_MOVE_DOWN") == false) {
                    socket.emit('player event', player+"_MOVE_LEFT");
                }
                break;
            case 39:
                if(storyline.GetVar(player+"_MOVE_DOWN") == false) {
                    socket.emit('player event', player+"_MOVE_RIGHT");
                }
                break;
            case 38:
                socket.emit('player event', player+"_MOVE_UP");
                break;
            case 40:
                if(storyline.GetVar(player+"_MOVE_DOWN") == false) {
                    socket.emit('player event', player+"_MOVE_DOWN");
                }
                break;
            case 90:
                if(storyline.GetVar(player+"_MOVE_DOWN") == false) {
                    socket.emit('player event', player+"_ATTACK_PRIMARY");
                }
                socket.emit('animation event', player+"_PRIMARY_ANIMATION");
                break;
            case 88:
                if(storyline.GetVar(player+"_MOVE_DOWN") == false) {
                    socket.emit('player event', player+"_ATTACK_SECONDARY");
                }
                socket.emit('animation event', player+"_SECONDARY_ANIMATION");
                break;
        }
    });

    // When player keys up
    $(document).keyup(function(e) {
        // Figure out the key, create an action, send to Mozart
        switch(e.which) {
            case 40:
                socket.emit('cancel animation event', player+"_MOVE_DOWN");
                break;
            case 90:
                socket.emit('cancel animation event', player+"_PRIMARY_ANIMATION");
                break;
            case 88:
                socket.emit('cancel animation event', player+"_SECONDARY_ANIMATION");
                break;
        }
    });

});

function checkPlayer(msg) {
    switch(msg) {
        case "PLAYER1_MOVE_LEFT":
            return "PLAYER1";
            break;
        case "PLAYER1_MOVE_RIGHT":
            return "PLAYER1";
            break;
        case "PLAYER1_MOVE_UP":
            return "PLAYER1";
            break;
        case "PLAYER1_MOVE_UP":
            return "PLAYER1";
            break;
        case "PLAYER1_ATTACK_PRIMARY":
            return "PLAYER1";
            break;
        case "PLAYER1_ATTACK_SECONDARY":
            return "PLAYER1";
            break;
        case "PLAYER2_MOVE_LEFT":
            return "PLAYER2";
            break;
        case "PLAYER2_MOVE_RIGHT":
            return "PLAYER2";
            break;
        case "PLAYER2_MOVE_UP":
            return "PLAYER2";
            break;
        case "PLAYER2_MOVE_UP":
            return "PLAYER2";
            break;
        case "PLAYER2_ATTACK_PRIMARY":
            return "PLAYER2";
            break;
        case "PLAYER2_ATTACK_SECONDARY":
            return "PLAYER2";
            break;
    }
}
