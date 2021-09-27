const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 5000;
const INDEX = '../client';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

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