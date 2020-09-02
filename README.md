## 1.安裝設定

```shell
git init
npm -y
npm i express mongoose
```

### 1.1 PATH  路徑操作模塊

> 參考文檔 https://nodejs.org/dist/latest-v14.x/docs/api/path.html

- path.basename
  - 獲取一個路建的文件名，包含擴展名
- path.dirname
  - 獲取一個路徑中的目錄部分
- path.exrname
  - 獲取一個路徑中的擴展名部分
- path.parse
  - 把一個路徑轉為對象
    - root 根路徑
    - dir 目錄
    - base包含後綴名的文件名
    - ext後綴名
    - name不包含後綴名的文件名
- path.join
  - 當你需要進行路徑拼接的時候，推薦使用這個方法
- path.isAbsolute

### 1.2 `__dirname`、`__filename`

在每個模塊中，除了 `require`、`exports` 等模塊相關的 API 之外，還有兩個特殊成員

- `__dirname` **動態獲取**，可以用來獲取當前文件模塊所屬目錄的絕對路徑，那個檔案在哪個位置，就獲取該位置的絕對路徑
- `__filename` **動態獲取**，可以用來獲取當前文件的絕對路徑
- `__dirname` `__filename` 是不受執行 node 命令所屬路徑影響的

在文件操作中，使用相對路徑是不可靠的 (這裡指的是 在某目錄執行 node )，他的相對路徑就是該目錄，因為在Node 中，文件操作的路徑被設計為相對於執行 node 命令所處的路徑，不是 bug ，人家設計這樣是有使用場景 (目前還沒了解)

所以為了解決這個問題，很簡單，只需要把相對路徑變為絕對路徑就可以了

在這裡我們可以使用 `__dirname` `__filename` 來幫我們解決這個問題

在拼接路徑的過程中，為了避免手動拼接帶來的一些低級錯誤，所以推計多使用：`path.join` 來輔助拼接路徑

所以為了盡量避免剛才所描述的這個問題，在文件操作中使用的相對路徑都統一轉換為 **動態的絕對路徑**。

> 補充：模塊中的路徑標示和這裡的路徑沒關係，不受影響 (相對於文件模塊)，如下面所示：

```javascript
var fs = require('fs')
var path = require('path')
require('./我的第三方文件')
```



## 2.快速啟動服務

```javascript
var express = require('express')

var path = require('path')

var app = express()

app.use('/public/', express.static(path.join(__dirname + './public/')))
app.use('/node_modules/', express.static(path.join(__dirname + './modules/')))


app.get('/', function(req, res) {
    res.send('Hello')
})

app.listen(5000, function() {
    console.log(' server running ...')
})
```

### 2.1 配置 `art-template` 模板引擎

- [art-template 官方文檔](https://aui.github.io/art-template/zh-cn/docs/)
- [express-art-template 官方文檔](https://aui.github.io/art-template/express/index.html)

安裝：

```shell
npm install art-template --save
npm install --save express-art-template
```

配置：

```javascript
var express = require('express');
var app = express();

// 這裡把 art 改成 html
// app.engine('art', require('express-art-template'));
app.engine('html', require('express-art-template'));
// 這邊把 view 也改成絕對路徑吧
app.set('views', path.join(__dirname, 'views'));
```

使用：

```javascript
// routes
app.get('/', function (req, res) {
    res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});
```

### 2.2 配置 `jquery` `bootstrap`	

```shell
npm i jquery bootstrap	
```

### 2.3 各種模板

標準語法：

```html
{{extend './layout.art'}}
{{block 'head'}} ... {{/block}}
```

layout：

```html
<!DOCTYPE html>
<html lang="zh-TW">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ block 'title' }}layout {{ /block }}</title>
    {{ block 'head'}} {{ /block }}
    <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap-grid.css">
</head>

<body>
    {{ include './header.html' }}
    <!-- 留一個坑，將來要留給孩子去填坑 -->
    {{ block 'content' }}
    <h1>默認內容</h1>
    {{ /block }} {{ include './footer.html' }}
    <script src="/node_modules/bootstrap/dist/js/bootstrap.js"></script>
    <script src="/node_modules/jquery/dist/jquery.js"></script>
    {{ block 'script' }} {{ /block }}
</body>

</html>
```

index：

```html
{{ extend './layout.html' }} {{ block 'title' }} 首頁 {{ /block }} {{ block 'head' }}
<style>
    body {
        background-color: pink;
    }
</style>
{{ /block }} {{ block 'content' }}
<div>
    <h1>Hello {{ name }} </h1>
</div>
{{ /block }} {{ block 'script' }}
<script>
    window.alert('早安 Leo')
</script>
{{ /block }}
```

head：

```html
<h1>共用的 Header</h1>
```

footer：

```html
<h1>我是 Footer</h1>
```

其他，例如 list ... 等等各種需要繼承共用的

```html
{{ extend './layout.html' }} {{ block 'content' }}
<div>
    <h1>列表頁自己的內容</h1>
</div>
{{ /block }}
```



## 3.路由設計

| 路徑      | 方法 | get參數 | post參數                  | 是否需要登陸 | 備註         |
| --------- | ---- | ------- | ------------------------- | ------------ | ------------ |
| /         | GET  |         |                           |              | 渲染首頁     |
| /register | GET  |         |                           |              | 渲染註冊頁面 |
| /register | POST |         | email、nickname、password |              | 註冊請求     |
| /login    | GET  |         |                           |              | 渲染登入頁面 |
| /login    | POST |         | email、password           |              | 處理登入請求 |
| /logout   | GET  |         |                           |              | 處理退出請求 |

- router.js 的內容

```javascript
var express = require('express')

var router = express.Router()

router.get('/', function(req, res) {
    res.render('index.html')
})

module.exports = rotuer
```



- app.js 的內容

```javascript
router = require('./router')
app.use(router)
```



## 4.模型設計

不同的集合，在mySql裡面稱為表單，不同的集合要放到 models 目錄中用 dbName.js 的方式保存起來

```shell
models- topic.js // 話題
      - user.js // 使用者資料
      - comment.js // 評論
      -
```



## 5.在Express 獲取表單 POST 請求數據

安裝：

```shell
npm install body-parser
```

配置：

```javascript
var express = require('express')
// 引包
var bodyParser = require('body-parser')

var app = express()

// 配置 body-parser
// 只要加入這個配置，則在 req 請求對象上會多出來一個屬性: body --- req.body
// 也就是說你就可以直接通過 req.body 來獲取表單 POST 請求數據了

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

```



## 6.使用mongoose

使用文件出處：https://mongoosejs.com/docs/guide.html

```javascript
var mongoose = require('mongoose')
var Schema = mongoose.Schema

  var blogSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });
```

連接數據庫 mongoose

文件出處：https://mongoosejs.com/

```javascript
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
```

連接數據庫會出現報錯 

```
DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead
```

使用下面搞定他，我也不懂為什麼

```javascript
//链接数据库
mongoose.set('useCreateIndex', true) //加上这个
mongoose.connect(db, { useNewUrlParser: true })
```

### 6.1 儲存資料與MD5

MD5是一個編碼，我們通常會把密碼編碼後存入數據庫，這樣也可以避免當數據庫資料外洩時，被人使用

文件出處：https://github.com/blueimp/JavaScript-MD5

```shell
npm install blueimp-md5
```

然後到程序中引入 ( router.js )

```javascript
var md5 = require('blueimp-md5')
```

避免被暴力破解，加密兩次，例如 12345 的密碼 md5 一次，他的值不會變

```javascript
body.password = md5(md5(body.password))
```

### 6.2 express-session 插件

在 Express 這個框架中，默認不支持 Session 和 Cookie，但是我們可以用第三方插件來實現

安裝：

```shell
npm install express-session
```

配置：

```shell
var session = require('express-session')
```

使用：

```shell
app.use(session({
  // 配置加密字符串，他會在原有加密基礎上和這個字符串拼接起來去加密 -- 增加安全性
  // 使用在 md5(md5(password))
  secret: 'keyboard cat',
  resave: false,
  // 無論你是否使用 session 我都默認直接給你分配一把鑰匙
  saveUninitialized: true
}))
```

當我們把這個插件配置好之後，我們就可以通過 req.session 來發訪問和設置 Session成員了

實際操作

```javascript
//    添加 Session 數據： req.session.foo = 'bar'
//    訪問 Session 數據： req.session.foo
```

提示：默認 session 數據是存放在記憶體裡面的，一但 server 重啟後就會失去，真正的運作環境會把

seasion 做持久性保存，這意謂者，要存放在資料庫 mongoDB 中



## 7.目錄結構

```
.
├ app.js               專案的入口文件
├ controllers
├ models               儲存使用 mongoose 設計的數據模型
├ node_modules         第三方插件
├ package.json         插件描述文件
├ package.json         鎖定版本文件 (npm 5 之後才有)
├ public               公共的靜態資源
├ README.md            項目說明文檔
├ routes               如果業務比較多，代碼量大，則需要把路由按照業務的分類儲存到 routes 此目錄中
├ router.js            把所有的路由都放到這個文件
└ views                分頁的管理目錄 ( *.html 放這邊)

```

## 8.程式設計步驟

- 創建目錄結構
- 整合靜態頁 - 模板頁 - 使用 art-template 模板引擎的高級語法 
  * include
  * block
  * extend

- 設計用戶登錄、退出、註冊 的路由
- 用戶註冊
  * 先處理好客戶端頁面的內容 ( 表單控件的 name、發送請求、收集表單數據、發起請求 )
  * 服務端
    - 獲取客戶端表單請求數據
    - 操作數據庫
      - 如果有錯，發送 500 告訴客戶端服務器錯了
      - 其他的根據你的業務發送不同的響應數據 ( respone -- res.status( xxx ).json( { } ) )
- 用戶登錄
- 用戶退出