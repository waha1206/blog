var express = require('express')

var path = require('path')

var app = express()

router = require('./router')

app.use('/public/', express.static(path.join(__dirname + '/public/')))
app.use('/node_modules/', express.static(path.join(__dirname + '/node_modules/')))

app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/')); // 默認就是 ./views 目錄

app.use(router)

app.listen(5000, function() {
    console.log(' server running ...')
})