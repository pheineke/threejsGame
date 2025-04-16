var socket = io();


socket.on('connect', () => {
    console.log('Connected to server.')
    socket.emit('my event', {data: 'I\'m connected!'});
});