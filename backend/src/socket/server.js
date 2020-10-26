var socketio = require('socket.io');
const {addUser, removeUser} = require('./connection');
const { sendMessage } = require('./message');

exports.socketServer = (server) => {

    const io = socketio(server)

    io.on('connection', (socket) => {

        socket.on('addConnection', (newUser, cb) => {
            newUser.id = socket.id
            const {err, user} = addUser(newUser)
            if(err) return cb(err)

            console.log(`${newUser.name} is online!`)
        })

        socket.on('sendMessage', sendMessage)

        socket.on('disconnect', () => {
            const removedUser = removeUser(socket.id)
            console.log(`${removedUser[0].name} has gone Offline!!`)
        })
    })

}