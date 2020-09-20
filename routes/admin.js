var express = require('express');

var md5 = require('blueimp-md5');

var User = require('../models/user');

const session = require('express-session');

var admin = express.Router();

var User = require('../models/user');

// 使用 await
var await = require('await');
var async = require('async');
// 開啟 csv檔
var fs = require('fs');
var parse = require('csv-parse');
// 使用 csvtojson
var csv = require('csvtojson');
const { send } = require('process');

router.get('/admin', function (req, res, next) {
  var user = req.session.user;
  User.find({}, function (err, data) {
    if (err) {
      return next(err);
    }
    console.log(data);
    res.render('./settings/user-authority.html', {
      user: user,
      users: data,
    });
  });

  User.find({}, function (err, users, next) {
    if (err) {
      return next(err);
    }
  });
});

router.get('/admin/test', function (req, res, next) {
  var user = req.session.user;
  User.find({}, function (err, data) {
    if (err) {
      return next(err);
    }
    console.log(req.query);
    console.log(req.url);

    // 使用 csv-parse 可以工作喔，先暫時註解掉
    //var csvData = [];
    // fs.createReadStream('C:/Users/User/Desktop/blog/public/file/customer.csv')
    // .pipe(parse({ delimiter: ',' }))
    // .on('data', function(csvrow) {
    //     console.log(csvrow);
    //     //do something with csvrow
    //     csvData.push(csvrow);
    // })
    // .on('end', function() {
    //     //do something with csvData
    //     console.log(csvData);
    // });

    const csvFilePath = 'C:/Users/User/Desktop/blog/public/file/customer2.csv';
    const csv = require('csvtojson');
    csv()
      .fromFile(csvFilePath)
      .then((jsonObj) => {
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        // res.setHeader('Access-Control-Allow-Credentials', true); // If needed
        // send(data)

        console.log(jsonObj[0]);
        res.send(jsonObj);

        /**
         * [
         * 	{a:"1", b:"2", c:"3"},
         * 	{a:"4", b:"5". c:"6"}
         * ]
         */
      });

    // Async / await usage
    //const jsonArray = await (csv().fromFile('C:/Users/User/Desktop/blog/public/file/customer2.csv'))
    //console.log(jsonArray)

    //console.log(data)
    // res.render('./settings/user-authority.html', {
    //     user: user,
    //     users: data
    // })
    // node cros 跨域請求 的設定
    return;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    ); // If needed
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    ); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    console.log(jsonArray);
    res.send(data); //-- 舊的客戶資料

    //console.log('送出資料')
  });
});

router.get('/admin/test2', function (req, res, next) {
  var user = req.session.user;
  console.log('A幹，我是GET耶');
  User.find({}, function (err, data) {
    if (err) {
      return next(err);
    }
    console.log(req.query);
    console.log(req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    ); // If needed
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    ); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    console.log(data);
    res.send(data); //-- 舊的客戶資料
    console.log('送出資料');
  });
});

router.post('/admin/test', function (req, res, next) {
  var user = req.session.user;
  User.find({}, function (err, data) {
    if (err) {
      return next(err);
    }
    console.log(req.body);
    //console.log(data)
    // res.render('./settings/user-authority.html', {
    //     user: user,
    //     users: data
    // })
    res.send(data);
  });
});

router.delete('', function (req, res, next) {
  var user = req.session.user;
  console.log(req.body);
});

router.post('/admin/test2', function (req, res, next) {
  var user = req.session.user;
  console.log(req.body);
  User.find({}, function (err, data) {
    if (err) {
      return next(err);
    }

    console.log('有跑到 delete 的 router 裡面', req.body);

    //console.log(data)
    // res.render('./settings/user-authority.html', {
    //     user: user,
    //     users: data
    // })
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    ); // If needed
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    ); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    res.header('Access-Control-Expose-Headers', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type,Access-Token,adminid'
    );
    res.send(data);
  });
});

module.exports = admin;
