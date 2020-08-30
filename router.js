var express = require('express')

var User = require('./models/user')

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

router.post('/register', function(req, res) {
    // 1.獲取表單提供的數據 -- 安裝 Express body-parser 中間件
    // 2.操作據庫
    // 判斷該用戶是否存在？
    // 如果已存在，不允許註冊
    // 如果不存在，註冊新用戶
    // 3.發送響應
    console.log(req.body)
    var body = req.body
    User.findOne({
        $or: [{
                email: body.email
            },
            {
                username: body.username
            }
        ]
    }, function(err, data) {
        if (err) {
            return res.status(500).send('server Error')
        }
        if (data) {
            // 郵箱或是暱稱已經存在
            return res.status(200).send('郵箱或是暱稱已經存在')
        }
        res.status(200).send(JSON.stringify({ success: true, foo: 'bar' }))
    })
})

router.post('login', function(req, res) {

})








module.exports = router