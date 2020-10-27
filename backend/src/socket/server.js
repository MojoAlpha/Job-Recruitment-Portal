var socketio = require('socket.io');
const {addUser, removeUser, getUser} = require('./connection');
const { sendMessage } = require('./message');
var Chat = require('../models/chat');

/*
newUser :- {_id: mongo user id,
            id: socket id,
            name: User Name}
*/

exports.socketServer = (server) => {

    const io = socketio(server)

    io.on('connection', (socket) => {

        socket.on('addConnection', (newUser, cb) => {
            newUser.id = socket.id
            const {err, user} = addUser(newUser)
            if(err) return cb(err)

            console.log(`${newUser.name} is online!`)
        })

        socket.on('sendMessage', (message, cb) => {
            const sender = getUser(message.sender);
            const reciever = getUser(message.reciever)

            let newMessage = new Chat({
                sender: message.sender,
                reciever: message.reciever,
                msg: message.msg
            })

            newMessage.save()
            .catch((err) => {
                console.log(err)
            })

            if(reciever !== undefined)
                socket.to(reciever.id).emit('Message',message)
            
            cb()
        })

        socket.on('disconnect', () => {
            const removedUser = removeUser(socket.id)
            console.log(removedUser)
        })
    })

}