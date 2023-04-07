const http = require('http');
const socketIO = require('socket.io');
const cors=require('cors');

const server = http.createServer();
const io = socketIO(server,{cors:{origin:'*'}});

io.on('connection', (socket) => {
  console.log('A client connected!');

  socket.on('message', (data) => {
    // console.log(`Received message: ${data}`);
    socket.broadcast.emit('message', data);
    // socket.broadcast.emit('message', { sender: socket.id, message: data });
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected!');
  });
});

server.listen(3000, () => {
  console.log('Server started!');
});