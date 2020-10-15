require('dotenv').config();
var nodemailer = require('nodemailer');

const transport = {
    host: 'smtp.gmail.com',
    service: "Gmail",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ADDR ,
        pass: process.env.EMAIL_PASS
    }
}

const mailer = nodemailer.createTransport(transport);
mailer.verify((error, success) => {
    if(error) {
        console.log(error)
    }
    else {
        console.log('Mailer Connected!!')
    }
})

module.exports = mailer