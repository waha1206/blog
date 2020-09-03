var express = require('express')

var md5 = require('blueimp-md5')

var User = require('../models/user')

const session = require('express-session')

var admin = express.Router()

var User = require('../models/user')

router.get('/admin', function(req, res, next) {
    var sess = req.session
    console.log(sess)

    console.log('這邊是管理者頁面喔')

    res.render('./settings/user-authority.html')

    User.find({}, function(err, users, next) {
        if (err) {
            return next(err)
        }
    })
})




module.exports = admin