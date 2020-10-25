const connectedUsers = []

const addUser = (newUser) => {
    
    const doesExist = connectedUsers.find((user) => user._id == newUser._id)

    if(doesExist) {
        return { err: "User Already Connected In Another Tab!"}
    }

    connectedUsers.push(newUser)
    console.log(newUser)
    return { newUser }
}

const removeUser = (id) => {
    const index = connectedUsers.findIndex((connectedUser) => connectedUser.id, id)

    if(index !== -1)
        return connectedUsers.splice(index, 1)
}

const getSocketId = () => {
    
}

module.exports = { addUser, removeUser }