var Skill = require('../../models/skill')
var User = require('../../models/user')
var Company = require('../../models/company')
var Vacancy = require('../../models/vacancy')

// skill searching method
async function searchSkill(search) {

    // Building REGEX Pattern String
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
    
    return result
}

// user searching method
async function searchUser(search) {

    // Building REGEX Pattern String
    let pattern = ""
    pattern = pattern + "^" + search.charAt(0)
    if(search.length > 2)
        pattern = pattern + search.charAt(1) + ".*"

    if(search.length > 4)
        pattern = pattern + search.charAt(Math.floor(search.length / 2)) + ".*"
    
    if(search.length > 6)
        pattern = pattern + search.charAt(search.length - 2) + ".*"
    
    // Options to ignore case & spaces in the regex pattern
    const result = await User.find({ name: {$regex: pattern, $options: 'six'} }, {_id: 1, name: 1, dp: 1})
    
    return result
}

// company searching method
async function searchCompany(search) {

    // Building REGEX Pattern String
    let pattern = ""
    pattern = pattern + "^" + search.charAt(0)
    if(search.length > 2)
        pattern = pattern + search.charAt(1) + ".*"

    if(search.length > 4)
        pattern = pattern + search.charAt(Math.floor(search.length / 2)) + ".*"
    
    if(search.length > 6)
        pattern = pattern + search.charAt(search.length - 2) + ".*"
    
    const result = await Company.find({ name: {$regex: pattern, $options: 'six'} }, {_id: 1, name: 1, logo: 1})
    
    return result
}

async function searchVacancy(search) {

    let pattern = ""
    pattern = pattern + "^" + search.charAt(0)
    if(search.length > 2)
        pattern = pattern + search.charAt(1) + ".*"

    if(search.length > 4)
        pattern = pattern + search.charAt(Math.floor(search.length / 2)) + ".*"
    
    if(search.length > 6)
        pattern = pattern + search.charAt(search.length - 2) + ".*"

    const result = await Vacancy.find({ isOpen: true, desig: {$regex: pattern, $options: 'six'}}, {accepted: 0, applicants: 0, requiredSkill: 0 })

    return result
}

// finding vacancies with skill with _id skillId
async function skillVacancy(search) {

    var result = await Vacancy.aggregate([
        {"$project": {
            isPresent: {"$in": [search.toString(), "$requiredSkill"]}, owner: 1, isOpen: 1, createdAt: 1, desig: 1
        }},
        {$set: {owner: {$toObjectId: "$owner"} }},      // setting string type 'owner' to Object type
        {"$match": {
            isPresent: true,
            isOpen: true
        }},
        {"$lookup": {       // looking for owner in another collection
            from: "companies",
            localField: "owner",
            foreignField: "_id",
            as: "company"
        }},
        {"$project": {      
            "requiredSkill": 0, "applicants": 0, "accepted": 0, "company.adminVerified": 0, "company.isVerified": 0, "company.encry_password": 0, "company.tokenExpiry": 0, "company.salt": 0, "company.verifyToken": 0, "company.followers": 0, "company.webLink": 0, "company.size": 0, "company.hq": 0, "company.createdAt": 0
        }},
        {"$sort": {"createdAt": -1}}
    ])

    return result
}

async function skillUser(search) {

    var result = await User.aggregate([
        {$set: {isPresent: {"$in": [search.toString(), "$skills"]}}},
        {"$match": {isPresent: {"$eq": true}}},
        {"$project": {"name": 1, "dp": 1, "email": 1}}
    ])

    return result
}

module.exports = {searchSkill, searchUser, searchCompany, searchVacancy, skillVacancy, skillUser}