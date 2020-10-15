var User = require('../../models/user')
var Skill = require('../../models/skill')

exports.addSkill = (req, res) => {
    
    User.findById(req.root._id, (error, user) => {
        if(error)
            return res.status(500).json({err: error, success: false})
        
        Skill.findById(req.body.skillId, (err, skill) => {
            if(!skill)
                return res.status(404).json({err: "Undefined Skill", success: false})
            
            if(user.skills.indexOf(req.body.skillId) > -1)
                return res.status(403).json({err: "Skill Already Exists!", success: false})
            
            user.skills.push(req.body.skillId)
            user.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })

            return res.status(200).json({msg: "New Skill Added!!", success: true})
        })
    })
}

exports.removeSkill = (req, res) => {
    
    User.findById(req.root._id, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})
        
        let elemInd = user.skills.indexOf(req.body.skillId)
        if(elemInd < 0)
            return res.status(404).json({err: "Skill Not Found!!", success: false})
        
        user.skills.splice(elemInd, 1)
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Skill Removed!!", success: true})
    })
}