var express = require('express')

var md5 = require('blueimp-md5')

var User = require('./models/user')
const session = require('express-session')

var router = express.Router()

router.get('/', function(req, res, next) {
    // console.log(req.session.user)
    res.render('index.html', {
        user: req.session.user
    })
})

router.get('/login', function(req, res, next) {
    res.render('login.html')
})

router.post('/login', function(req, res, next) {
    // 獲取表單數據
    // 查詢數據庫，用戶名與密碼是否正確
    // 發動響應數據
    console.log(req.body)
    var body = req.body

    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, function(err, user) {
        if (err) {
            return next(err)
        }

        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: 'email or password is invalid.'
            })
        }

        req.session.user = user
        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    })
})

router.get('/register', function(req, res, next) {
    res.render('register.html')
})

router.post('/register', function(req, res, next) {
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
                nickname: body.username
            }
        ]
    }, function(err, data, next) {
        if (err) {
            return next(err)
        }
        if (data) {
            console.log(data)
                // 郵箱或是暱稱已經存在
            return res.status(200).json({
                err_code: 1,
                message: '郵箱或是暱稱已存在'
            })
        }
        // md5 加密兩次防止被破解
        body.password = md5(md5(body.password))
        new User(body).save(function(err, user) {
            if (err) {
                return next(err)
            }
            // 註冊成功，使用 session 紀錄用戶的登錄狀態
            req.session.user = user
                // express 提供了一個方法 json({ key:value }) 會直接發送一個 json 格式給 瀏覽器端
            res.status(200).json({
                err_code: 0,
                message: 'ok'
            })
        })
    })
})

router.get('/logout', function(req, res, next) {
    // 清除登錄'狀態
    req.session.user = null
        // 重定向到登錄頁面
    res.redirect('/login')
})

router.get('/test', function(req, res, next) {
    console.log(req.body)
    res.send('我是get的響應的文本內容')
})
router.post('/test', function(req, res, next) {
    console.log(req.body)
    res.send('我是post的響應的文本內容')
})


module.exports = router