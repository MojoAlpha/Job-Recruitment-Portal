var Skill = require('../../models/skill')
var User = require('../../models/user')
var Company = require('../../models/company')

// skill searching method
async function searchSkill(search) {

    // Building REGEX Pattern String
    let pattern = ""
    pattern = pattern + "^" + search.charAt(0)
    if (search.length > 2)
        pattern = pattern + search.charAt(1) + ".*"

    if (search.length > 4)
        pattern = pattern + search.charAt(Math.floor(search.length / 2)) + ".*"

    if (search.length > 6)
        pattern = pattern + search.charAt(search.length - 2) + ".*"

    const result = await Skill.find({
            name: {
                $regex: pattern,
                $options: 'si'
            }
        })
        .sort({
            name: 1
        })

    return result
}

// user searching method
async function searchUser(search) {

    // Building REGEX Pattern String
    let pattern = ""
    pattern = pattern + "^" + search.charAt(0)
    if (search.length > 2)
        pattern = pattern + search.charAt(1) + ".*"

    if (search.length > 4)
        pattern = pattern + search.charAt(Math.floor(search.length / 2)) + ".*"

    if (search.length > 6)
        pattern = pattern + search.charAt(search.length - 2) + ".*"

    const result = await User.find({
        name: {
            $regex: pattern,
            $options: 'si'
        }
    }, {
        _id: 1,
        name: 1,
        dp: 1,
        bio: 1
    })

    return result
}

// company searching method
async function searchCompany(search) {

    // Building REGEX Pattern String
    let pattern = ""
    pattern = pattern + "^" + search.charAt(0)
    if (search.length > 2)
        pattern = pattern + search.charAt(1) + ".*"

    if (search.length > 4)
        pattern = pattern + search.charAt(Math.floor(search.length / 2)) + ".*"

    if (search.length > 6)
        pattern = pattern + search.charAt(search.length - 2) + ".*"

    const result = await Company.find({
        name: {
            $regex: pattern,
            $options: 'si'
        }
    }, {
        _id: 1,
        name: 1,
        logo: 1,
        desc: 1
    })

    return result
}

module.exports = {
    searchSkill,
    searchUser,
    searchCompany
}