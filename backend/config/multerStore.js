var multer = require('multer')
var path = require('path')
var crypto = require('crypto')

exports.userDpStore = multer({
    storage: multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, './public/dp')
            },
            filename: function(req, file, cb) {
                cb(null, crypto.randomBytes(15).toString('hex') + path.extname(file.originalname))
            }
        }),
    fileFilter: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error("Only images are allowed!!"))
        }
        cb(null, true)
    }
})

exports.companyLogoStore = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/logo')
        },
        filename: function(req, file, cb) {
            cb(null, crypto.randomBytes(15).toString('hex') + path.extname(file.originalname))
        }
    }),
fileFilter: function(req, file, cb) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return cb(new Error("Only images are allowed!!"))
    }
    cb(null, true)
}
})