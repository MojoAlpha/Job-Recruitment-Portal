require('dotenv').config();
const prompt = require('prompt-sync')();
const MongoClient = require('mongoose').mongo.MongoClient;

const usrname = prompt("Enter Username : ");
const password = prompt.hide("Enter Password : ");

// const url = "mongodb://localhost:27017/DB"
const url = process.env.MONGO_URL

MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser : true,
}, function(err, db) {
    if(err) {
        console.log(err)
        return ;
    }

    var dbo = db.db("DB")
    var adminObj = { username: usrname, password: password }
    dbo.collection("admin").findOne({username: usrname}, (err, usr) => {

        if(err) throw err;
        if(usr) {
            console.log("Admin Username Already Exists!!")
            db.close()
            return ;
        }

        dbo.collection("admin").insertOne(adminObj, (err, res) => {
            if(err) throw err;
            console.log(usrname + " Admin Registered!!")
            db.close()
        })
    }) 
})