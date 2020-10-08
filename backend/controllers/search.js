var Skill = require('../models/skill')
var User = require('../models/user')
var Company = require('../models/company')

exports.skillSearch = (req, res) => {
    if(req.query.search === undefined)
        return res.status(400).json({err: "Specify Search Query", success: false})
    let search = req.query.search

    let pattern = ""
    pattern = pattern + "^" + search.charAt(0) + ".*"
    if(search.length > 4) 
        pattern = pattern + search.charAt(Math.floor(search.length / 2)) + ".*"

    if(search.length > 1)
        pattern = pattern + search.charAt(search.length - 1) + ".*"

    console.log("Searching ... Pattern : ", pattern)

    Skill.find({
        name: {$regex : pattern, $options: 'si'}
    })
    .sort({name: 1})
    .then((skillList) => {
        res.send(skillList)
    })
}

exports.mainSearch = (req, res) => {
    if(req.query.search === undefined)
        return res.status(400).json({err: "Specify Search Query", success: false})
    let search = req.query.search

    let pattern = ""
    pattern = pattern + "^" + search.charAt(0) + ".*"

    if(search.length > 4) 
        pattern = pattern + search.charAt(Math.floor(search.length / 2)) + ".*"

    if(search.length > 1)
        pattern = pattern + search.charAt(search.length - 1) + ".*"
    
    User.find({ name: {$regex: pattern, $options: 'si'} }, (err, userList) => {
        Company.find({ name: {$regex: pattern, $options: 'si'}}, (err, companyList) => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({success: true, users: userList, companies: companyList})
        })
    })
}