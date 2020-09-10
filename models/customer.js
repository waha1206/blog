var mongoose = require('mongoose')

// 連接數據庫
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

var Schema = mongoose.Schema

var userSchema = new Schema({
    email: {
        type: String,
        required: true, // 必須
        unique: true // 唯一不重複
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        // 這裡不要寫 Date.now() 因為會即刻調用
        // 這裡直接給了一個方法: Date.now
        // 當你去 new Model 的時候，如果你沒有傳遞 create_time , 則 mongoose 就會調用 date.now 這個方法去執行，讓他成為 default 的值
        default: Date.now
    },
    last_modify_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: Date
    },
    status: {
        type: Number,
        // 0 沒有權限限制
        // 1 不可以評論
        // 2 不可以登入
        // 是否可以評論
        // 是否可以登入使用
        enum: [0, 1, 2],
        default: 0
    }
})


module.exports = mongoose.model('User', userSchema)