const express = require('express');

const http =  require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express(); 
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
console.log('someone connected:', socket.id);

socket.on('chat message', (text) =>{
	io.emit('chat message', text);
});

socket.on('disconnect',() =>{
	console.log('someone left: ', socket.id);
});
});
server.listen(3000, '0.0.0.0', () => {
	console.log('Server is running on port 3000');
});
