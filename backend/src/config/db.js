require('dotenv').config();
var mongoose = require('mongoose')

const url = process.env.MONGO_URL

// Connecting to Mongo Atlas with its Connection String
const connectDB = mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false 
})

connectDB.then((db) => {
    console.log('Connected To Database!!')
    }, (err) => {console.log(err)})

module.exports = connectDB;