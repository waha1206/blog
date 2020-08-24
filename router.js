var express = require('express')

var router = express.Router()

router.get('/', function(req, res) {
    res.render('index.html')
})

router.get('/login', function(req, res) {
    res.render('login.html')
})

router.post('login', function(req, res) {

})

router.get('/register', function(req, res) {
    res.render('register.html')
})

router.post('login', function(req, res) {

})








module.exports = router