var socketio = require('socket.io');
const {addUser, removeUser, getUser} = require('./connection');
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
            console.log(JSON.stringify(newUser));
            newUser.id = socket.id
            const {err, user} = addUser(newUser)
            if(err) return cb(err)

            console.log(`${JSON.stringify(newUser)} is online!`)
        })

        socket.on('sendMessage', (message, cb) => {
            console.log(JSON.stringify(message))
            const sender = getUser(message.sender);
            const reciever = getUser(message.receiver)

            let newMessage = new Chat({
                sender: message.sender,
                reciever: message.receiver,
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
            console.log("removing the user.")
            const removedUser = removeUser(socket.id)
        })
    })

}