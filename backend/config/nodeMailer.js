var nodemailer = require('nodemailer');
var keys = require('./keys')

const transport = {
    host: 'smtp.gmail.com',
    service: "Gmail",
    port: 587,
    secure: false,
    auth: {
        user: keys.EMAIL_ADDR,
        pass: keys.EMAIL_PASS
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