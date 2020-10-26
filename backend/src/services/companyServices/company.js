var Company = require('../../models/company')
var User = require('../../models/user')

/* followStatus Codes :-
    0 - Company Followed
    1 - Company Not Followed */
exports.companyDetails = (req, res) => {
    
    Company.findById(req.root._id, (err, company) => {
        
        if(!company)
            return res.status(404).json({err: "Invalid Comapny!!", success: false})
        
        let followStatus
        if(company.followers.indexOf(req.root._id) >= 0)
            followStatus = 0
        else
            followStatus = 1
        
        // Returning The Advanced Details About The Company
        res.status(200).json({
            name: company.name,
            email: company.email,
            desc: company.desc,
            logo: company.logo,
            hq: company.hq,
            size: company.size,
            webLink: company.webLink,
            followerCount: company.followers.length,
            followStatus: followStatus
        })
    })
}

// Following A Company
exports.companyFollow = (req, res) => {

    // Restricting This Only To Users
    if(req.root.type !== "U")
        return res.status(400).json({err: "You Are Not Allowed To Follow Other Companies", success: false})
    
    User.findById(req.root._id, (err, user) => {
        Company.findById(req.params.companyId, (err, company) => {
            
            if(!company)
                return res.status(404).json({err: "Company Not Found!!", success: false})
            
            // Checking If The Company Is Already Followed By The User
            if(user.followed.indexOf(req.params.companyId) >= 0)
                return res.status(403).json({err: "Already Following This Company!", success: false})
            
            company.followers.push(req.root._id)
            user.followed.push(req.params.companyId)
            company.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })
            user.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })

            res.status(200).json({msg: "Company Followed!!", success: true})
        })
    })
}

// Unfollow A Company
exports.companyUnfollow = (req, res) => {
    if(req.root.type !== "U")
        return res.status(400).json({err: "You Cannot Follow Companies!!", success: false})
    
    User.findById(req.root._id, (err, user) => {
        Company.findById(req.params.companyId, (err, company) => {

            if(!company)
                return res.status(404).json({err: "Company Not Found!!", success: false})
            
            // Checking For Each Other In The Follower List
            let companyIndex = company.followers.indexOf(req.root._id)
            let userIndex = user.followed.indexOf(req.params.companyId)
            if(companyIndex < 0 && userIndex < 0)
                return res.status(403).json({err: "Not Following The Company!!", success: false})

            company.followers.splice(companyIndex, 1)
            user.followed.splice(userIndex, 1)
            
            company.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })
            user.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })

            res.status(200).json({msg: "Company Unfollowed!!", success: true})
        })
    })
}