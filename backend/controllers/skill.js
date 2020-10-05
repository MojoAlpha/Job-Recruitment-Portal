var Skill = require('../models/skill');

exports.listSkill = (req, res) => {
    let skip = 0
    if(req.body.skip !== undefined)
        skip = req.body.skip
    Skill.find({})
    .sort({name: 1})
    .skip(15 * skip)
    .limit(15)
    .then((list) => {
        if(!list) {
            return res.status(500).json({err: "Something Bad Has Happened", success: false})
        } 

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({success: true, skillList: list})
    }, (err) => res.status(400).json({err: "Cannot Fetch List"}))
}

exports.createSkill = (req, res) => {
    if(req.body.name === undefined) {
        return res.status(400).json({err: "Skill Name isn't specified!!", success: false})
    }

    Skill.findOne({name: req.body.name}, (err, skill) => {
        if(skill) {
            return res.status(403).json({err: "Skill Already Exists!!", success: false})
        }

        var newSkill = new Skill({
            name: req.body.name
        })
    
        newSkill.save((err, skill) => {
            if(err) {
                return  res.status(500).json({err: "Couldn't be created!!", success: false})
            }
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({success: true, msg: "Skill Added!!"})
    })
}

exports.deleteSkill = (req, res) => {
    if(req.body.skillId === undefined) {
        return res.status(400).json({err: "Skill ID isn't specified!!", success: false})
    }

    Skill.findByIdAndDelete(skillId, (err, skill) => {
        if(err || !skill) {
            return res.status(403).json({err: "Skill not found!!", success: false})
        }
    })

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({msg: "Skill Deleted", success: true})
}