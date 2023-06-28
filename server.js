const express = require('express');
const path = require('path');

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;


app.use(express.static(path.join(__dirname + "/public")));

io.on('connection', (socket) => {
  socket.on('newuser', (username) => {
    // Broadcast a message to all connected clients
    socket.broadcast.emit("update", username+"joined the conversation");
  });

  socket.on('exituser', (username) => {
 

    // Broadcast the message to all connected clients
    socket.broadcast.emit('update', username+"left the conversation");
  });

  socket.on('chat', (message) => {
    socket.broadcast.emit("chat",message);
  });
});

// // Define routes
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.get('/about', (req, res) => {
//   res.send('About page');
// });

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
