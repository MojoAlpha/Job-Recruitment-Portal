var Skill = require('../../models/skill')
var User = require('../../models/user')
var Company = require('../../models/company')

async function searchSkill(search) {
    let pattern = ""
    pattern = pattern + "^" + search.charAt(0)
    if(search.length > 2)
        pattern = pattern + search.charAt(1) + ".*"

    if(search.length > 4)
        pattern = pattern + search.charAt(Math.floor(search.length / 2)) + ".*"
    
    if(search.length > 6)
        pattern = pattern + search.charAt(search.length - 2) + ".*"
    
    const result = await Skill.find({ name: {$regex: pattern, $options: 'si'} })
                              .sort({name: 1})
    
    console.log(result)
}

async function searchUser(search) {
    let pattern = ""
    pattern = pattern + "^" + search.charAt(0)
    if(search.length > 2)
        pattern = pattern + search.charAt(1) + ".*"

    if(search.length > 4)
        pattern = pattern + search.charAt(Math.floor(search.length / 2)) + ".*"
    
    if(search.length > 6)
        pattern = pattern + search.charAt(search.length - 2) + ".*"
    
    const result = await User.find({ name: {$regex: pattern, $options: 'si'} }, {_id: 1, name: 1, dp: 1, bio: 1})
    
    console.log(result)
}

async function searchCompany(search) {
    let pattern = ""
    pattern = pattern + "^" + search.charAt(0)
    if(search.length > 2)
        pattern = pattern + search.charAt(1) + ".*"

    if(search.length > 4)
        pattern = pattern + search.charAt(Math.floor(search.length / 2)) + ".*"
    
    if(search.length > 6)
        pattern = pattern + search.charAt(search.length - 2) + ".*"
    
    const result = await Company.find({ name: {$regex: pattern, $options: 'si'} }, {_id: 1, name: 1, dp: 1, bio: 1})
    
    console.log(result)
}

module.exports = {searchSkill, searchUser, searchCompany}