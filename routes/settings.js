var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  database:'Fibonacci',
  password:'111111'
});
require('date-utils');

router.route('/').get(function(req,res){
  conn.query('select temperature,humidity,lock_time from user where id =\'admin\'',function(err,row){
    if(err){
      res.send(console.error());
    }else{
      res.send(row);
    }
  })
})

router.route('/temperature').post(function(req,res){
  conn.query('update user set temperature=\''+req.body.temperature+'\' where id =\'admin\'',function(err){
    if(err){
      res.send(console.error());
    }else{
      res.send('temperature setting update success');
    }
  })
})

router.route('/humidity').post(function(req,res){
  conn.query('update user set humidity=\''+req.body.humidity+'\' where id =\'admin\'',function(err){
    if(err){
      res.send(console.error());
    }else{
      res.send('humidity setting update success');
    }
  })
})

router.route('/lock_time').post(function(req,res){
  conn.query('update user set lock_time=\''+req.body.lock_time+'\' where id =\'admin\'',function(err){
    if(err){
      res.send(console.error());
    }else{
      res.send('lock_time setting update success');
    }
  })
})

module.exports = router;
