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

var switch_select_sql = 'select * from switch where idx=1';
var switch_update_sql = 'update switch set ';

router.route('/').get(function(req,res){
  conn.query(switch_select_sql, function(err,rows){
    if(err){
      console.log(err);
    } else {
      res.send(JSON.stringify(rows));
    }
  })
})

router.route('/').post(function(req,res){
  var added_switch_update_sql = switch_update_sql+req.body.device+'=\''+req.body.status+'\' where idx=1';
  var switch1_fan_flag_sql= 'update switch set fan_flag=1 where idx=1';
  var switch0_fan_flag_sql= 'update switch set fan_flag=0 where idx=1';
  var switch1_humi_flag_sql= 'update switch set humi_flag=1 where idx=1';
  var switch0_humi_flag_sql= 'update switch set humi_flag=0 where idx=1';
  var switch1_led_flag_sql= 'update switch set led_flag=1 where idx=1';
  var switch0_led_flag_sql= 'update switch set led_flag=0 where idx=1';
  var switch1_com_flag_sql= 'update switch set com_flag=1 where idx=1';
  var switch0_com_flag_sql= 'update switch set com_flag=0 where idx=1';

  conn.query(added_switch_update_sql, function(err,rows){
    if(err){
      console.log(err);
    } else {
      switch(req.body.device){
        case 'fan':
          conn.query(switch1_fan_flag_sql, function(err,rows){
            if(err){
              console.log(err);
            } else {
              console.log('switch : change >> fan_flag = 1');
              setTimeout(function(){
                conn.query(switch0_fan_flag_sql, function(err,rows){
                  if(err){
                    console.log(err);
                  } else {
                    console.log('switch : change >> fan_flag = 0');
                  }
                });
              },60000);
            }
          });
          break;
        case 'humidifier':
          conn.query(switch1_humi_flag_sql, function(err,rows){
            if(err){
              console.log(err);
            } else {
              console.log('switch : change >> humi_flag = 1');
              setTimeout(function(){
                conn.query(switch0_humi_flag_sql, function(err,rows){
                  if(err){
                    console.log(err);
                  } else {
                    console.log('switch : change >> humi_flag = 0');
                  }
                });
              },60000);
            }
          });
          break;
        case 'ledStand':
          conn.query(switch1_led_flag_sql, function(err,rows){
            if(err){
              console.log(err);
            } else {
              console.log('switch : change >> led_flag = 1');
              setTimeout(function(){
                conn.query(switch0_led_flag_sql, function(err,rows){
                  if(err){
                    console.log(err);
                  } else {
                    console.log('switch : change >> led_flag = 0');
                  }
                });
              },60000);
            }
          });
          break;

        case 'computer':
          conn.query(switch1_com_flag_sql, function(err,rows){
            if(err){
              console.log(err);
            } else {
              console.log('switch : change >> com_flag = 1');
              setTimeout(function(){
                conn.query(switch0_com_flag_sql, function(err,rows){
                  if(err){
                    console.log(err);
                  } else {
                    console.log('switch : change >> com_flag = 0');
                  }
                });
              },60000);
            }
          });
          break;

      }
      res.send(req.body.device+':'+req.body.status);
    }
  })



})

module.exports = router;
