const { validationResult } = require('express-validator');

exports.vacancyErrors = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(400).json({
            err: errors.array()[0].msg,
            location: errors.array()[0].param, 
            success: false
        })
    }

    next();
}