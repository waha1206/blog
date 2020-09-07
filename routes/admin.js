var express = require('express')

var md5 = require('blueimp-md5')

var User = require('../models/user')

const session = require('express-session')

var admin = express.Router()

var User = require('../models/user')

router.get('/admin', function(req, res, next) {
    var user = req.session.user
    User.find({},
        function(err, data) {
            if (err) {
                return next(err)
            }
            console.log(data)
            res.render('./settings/user-authority.html', {
                user: user,
                users: data
            })
        })

    User.find({}, function(err, users, next) {
        if (err) {
            return next(err)
        }
    })
})

router.get('/admin/test', function(req, res, next) {
    var user = req.session.user
    User.find({},
        function(err, data) {
            if (err) {
                return next(err)
            }
            console.log(req.query)
            console.log(req.url)
                //console.log(data)
                // res.render('./settings/user-authority.html', {
                //     user: user,
                //     users: data
                // })
                // node cros 跨域請求 的設定
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
            res.setHeader('Access-Control-Allow-Credentials', true); // If needed
            res.send(data)
        })
})

router.post('/admin/test', function(req, res, next) {
    var user = req.session.user
    User.find({},
        function(err, data) {
            if (err) {
                return next(err)
            }
            console.log(req.body)
                //console.log(data)
                // res.render('./settings/user-authority.html', {
                //     user: user,
                //     users: data
                // })
            res.send(data)
        })
})



module.exports = admin