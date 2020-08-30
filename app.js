var express = require('express')

var path = require('path')

var app = express()

var bodyParser = require('body-parser')

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

// 把路由掛載到 app 中
app.use(router)

app.listen(5000, function() {
    console.log(' server running ...')
})