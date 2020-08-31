var express = require('express')

var path = require('path')

var app = express()

var bodyParser = require('body-parser')

var session = require('express-session')

router = require('./router')

app.use('/public/', express.static(path.join(__dirname + '/public/')))
app.use('/node_modules/', express.static(path.join(__dirname + '/node_modules/')))

app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/')); // 默認就是 ./views 目錄

// 安裝中間件 -- 這次裝了 body-parser 解析 req 讓 req 多了一個 body 屬性 來解析 收到的 post
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// 在 Express 這個框架中，默認不支持 Session 和 Cookie
// 但是我們可以使用第三方中間件： express-session 來解決
// 1. npm install express-session
// 2. 配置 var session = require('express-session')
// 3. 使用 一定要在 app.use(router) 之前
//    當我們把這個插件配置好之後，我們就可以通過 req.session 來發訪問和設置 Session成員了
//    添加 Session 數據： req.session.foo = 'bar'
//    訪問 Session 數據： req.session.foo

app.use(session({
    secret: 'keyboard cat', // 配置加密字符串，他會在原有加密基礎上和這個字符串拼接起來去加密 -- 增加安全性
    resave: false,
    saveUninitialized: true // 無論你是否使用 session 我都默認直接給你分配一把鑰匙
}))

// 把路由掛載到 app 中
app.use(router)

app.listen(5000, function() {
    console.log(' server running ...')
})