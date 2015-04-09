var socket = io();

$('form').submit(function(){
socket.emit('player event', $('#m').val());
$('#m').val('');
return false;
});
socket.on('player event', function(msg){
$('#messages').append($('<li>').text(msg));
});

$(window).keypress(function(e) {
    console.log("hi");
    var key = e.which;
    socket.emit('log', key);
   //do stuff with "key" here...
});
