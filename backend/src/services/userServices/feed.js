var User = require('../../models/user')
var Vacancy = require('../../models/vacancy')
var Posts = require('../../models/post')

exports.getUserFeed = (req, res) => {

    User.findById(req.root._id, (err, user) => {

        let skipVal = 0
        if(req.body.skipVal !== undefined)
            skipVal = req.body.skipVal

        Posts.aggregate([
            {"$match": { "$or": [ { "owner": { "$in": user.connections } }, { "owner": { "$in": user.followed } } ] }},
            {$set: {owner: {$toObjectId: "$owner"} }},
            {"$lookup": {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "user"
            }},
            {"$lookup": {
                from: "companies",
                localField: "owner",
                foreignField: "_id",
                as: "company"
            }},
            {"$project": {"user.education": 0, "user.exp": 0, "user.links": 0, "user.skills": 0, "user.followed": 0, "user.connections": 0, "user.encry_password": 0, "user.salt": 0, "user.connRequests": 0, "user.addr": 0, "user.isVerified": 0, "company.encry_password": 0, "company.salt": 0, "company.followers": 0, "company.isVerified": 0, "company.adminVerified": 0}},
            {"$sort": {"createdAt": -1}},
            {"$skip": skipVal * 10},
            {"$limit": 10}
            ])
        .then((feedPosts) => {
            if(feedPosts.length > 0)
                res.send(feedPosts)
            else {
            Posts.aggregate([
                {"$sample": {size: 5}}
            ])
            .then((xtraPosts) => {
                res.send(xtraPosts)
            })}
            
        }, (err) => {
            return res.status(500).json({err: "Something Might Be Wrong, Please Try After Sometime!", success: false})
        })
    })
}

exports.appliedVacancy = (req, res) => {

    console.log(req.root._id)
    Vacancy.aggregate([
        {"$project": {
            isApplicant: {"$in": [req.root._id.toString(), "$applicants"]},
            isSelected: {"$in": [req.root._id.toString(), "$accepted"]}, isOpen: 1, desig: 1, owner: 1, title: 1, createdAt: 1
        }
        },
        {$set: {owner: {$toObjectId: "$owner"} }},
        {
            "$match": {
                "$or": [
                    {isApplicant: true},
                    {isSelected: true}
                ]
            }
        },
        {
            "$lookup": {
                from: "companies",
                localField: "owner",
                foreignField: "_id",
                as: "company"
            }
        },
        {
            "$project": {
                "company.followers": 0, "company.adminVerified": 0, "company.isVerfied": 0, "company.encry_password": 0, "company.salt": 0, "company.verifyToken": 0, "company.createdAt": 0, "company.updatedAt": 0, "company.webLink": 0, "company.size": 0
            }
        },
        {
            "$sort": { "createdAt": -1 }
        }
    ])
    .then((vacList) => {
        
        return res.status(200).json({appliedVac: vacList, success: true})
    }, (err) => {
        return res.status(500).json({err: err, success: false})
    })
}

exports.suggestedVacancy = (req, res) => {

    User.findById(req.root._id, (err, user) => {

        Vacancy.aggregate([
            { "$project": {similar: {"$size": { "$setIntersection": ["$requiredSkill", user.skills] } }, isApplicant: {"$in": [req.root._id.toString(), "$applicants"]} , isSelected: {"$in": [req.root._id.toString(), "$accepted"]} , title: 1, owner: 1, desig: 1, isOpen: 1} },
            {$set: {owner: {$toObjectId: "$owner"} }},
            { "$match": {"$and": [{"similar": { "$gt": 0} }, { "isOpen": { "$eq": true } }, {"isApplicant": {"$eq": false}}, {"isSelected": {"$eq": false}}] } },
            { "$lookup": {
                from: "companies",
                localField: "owner",
                foreignField: "_id",
                as: "company"
            } },
            { "$project": {"company.name": 1, "company.logo": 1, "title": 1, "desig": 1, "similar": 1} },
            { "$sort": { "similar": -1 } }
        ])
        .then((suggestedList) => {
            res.send(suggestedList)
        }, (err) => {
            return res.status(500).json({err: err, success: false})
        })
    })
}