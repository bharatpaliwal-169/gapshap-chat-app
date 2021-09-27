const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const express = require('express');

// const PORT = process.env.PORT || 5000;


const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());



io.on('connection', socket => {
  //get the user id
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      //person that sends the msg
      //seperrate recipients that send and recieve the msg
      const newRecipients = recipients.filter(r => r !== recipient)
      //overwrite the existing recipients with the last msg send one
      newRecipients.push(id)
      //reciever
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
})
server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));