var Company = require('../../models/company')
var Notification = require('../../models/notification')
const Vacancy = require('../../models/vacancy')

/*
2 - Vacancy Has Been Posted
3 - Vacancy Has Selected You
4 - Vacancy Has Been Closed
*/

// Generating A Notification For All The Users Following A Company After A Post
exports.postVacancyNotify = (req, res) => {
    
    Company.findById(req.root._id, (err, company) => {
        
        var notifications = []
        company.followers.map((userId) => {
            notifications.push(new Notification({
                reciever: userId,
                sender: req.root._id,
                code: 2,
                link: `${process.env.HOST}/vacancy/${req.root.vacancyId}`
            }))
        })

        Notification.insertMany(notifications)
        .catch((err) =>  {
            return res.status(500).json(err)
        })

        return res.status(200).json({msg: "Vacancy Posted!!", success: true})
    })
}

// Notification For The Selected User In A Vacancy
exports.selectedNotify = (req, res) => {

    var newNotify = new Notification({
        reciever: req.body.userId,
        sender: req.root._id,
        code: 3,
        link: `${process.env.HOST}/vacancy/${req.root.vacancyId}`
    })

    newNotify.save()
    .catch((err) =>  {
        return res.status(500).json(err)
    })

    return res.status(200).json({msg: "User Selected!!", success: true})
}

// Notification After A Vacancy Is Closed
exports.closeNotify = (req, res) => {
    
    Vacancy.findById(req.root.vacancyId, (err, vacancy) => {
        var applicList = []
        vacancy.applicants.map((id) => {
            applicList.push(new Notification({
                reciever: id,
                from: req.root._id,
                code: 4,
                link: `${process.env.HOST}/vacancy/${req.root.vacancyId}`
            }))
        })

        Notification.insertMany(applicList)
        .catch((err) =>  {
            return res.status(500).json(err)
        })

        return res.status(200).json({msg: "Vacancy Closed!!", success: true})
    })
}