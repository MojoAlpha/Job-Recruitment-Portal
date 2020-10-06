var Skill = require('../models/skill')

exports.skillSearch = (req, res) => {
    let search = req.query.search

    let pattern = "^"
    pattern = pattern + search.charAt(0) + ".*"
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