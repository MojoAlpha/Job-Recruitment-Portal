var mongoose = require('mongoose')
var keys = require('./keys')

const url = keys.MONGO_URL

// Connecting to Mongo Atlas with its Connection String
exports.connectDB = () => {

    const connectMongo = mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser : true,
        useCreateIndex : true,
        useFindAndModify : false 
    })

    connectMongo.then((db) => {
        console.log('Connected To Database!!')
        }, (err) => {console.log(err)})
}
