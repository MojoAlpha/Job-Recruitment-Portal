var Company = require('../../models/company')
var Notification = require('../../models/notification')
const Vacancy = require('../../models/vacancy')

// Generating A Notification For All The Users Following A Company After A Post
exports.postVacancyNotify = (req, res) => {
    
    Company.findById(req.root._id, (err, company) => {
        
        var notifications = []
        company.followers.map((userId) => {
            notifications.push(new Notification({
                reciever: userId,
                sender: req.root._id,
                msg: "A New Job Has Been Posted You Might Want To Have A Look!!",
                link: `${process.env.HOST}/vacancy/`
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
        msg: "Congratulations You Have Been Selected For The Job!!",
        link: `${process.env.HOST}/company/`
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
                msg: "The Vacancy Has Been Closed. Visit To Know More!!",
                link: `${process.env.HOST}/vacancy/`
            }))
        })

        Notification.insertMany(applicList)
        .catch((err) =>  {
            return res.status(500).json(err)
        })

        return res.status(200).json({msg: "Vacancy Closed!!", success: true})
    })
}