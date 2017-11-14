var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('date-utils');

var conn = mysql.createConnection({
host:'localhost',
user:'root',
database:'Fibonacci',
password:'111111'
});

router.route('/dht').get(function(req,res){
    var dht_sql = 'SELECT * FROM dht';
    //console.log('GET /users');
    conn.query(dht_sql,function(err,rows){
        if(err){
            console.log(err);
        }else{
          res.send(JSON.stringify(rows));
        } //else
     }); //end query()
})//end of get

router.route('/updateDht').post(function(req,res){
    console.log("Adding DHT VALUES : "+req.body.humidity+", "+req.body.temperature);

    var newDate = new Date();
    var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

    var humidity = req.body.humidity;
    var temperature = req.body.temperature;
    var params = [time,humidity,temperature];
    var post_sql = 'update dht set time=?,humidity=?,temperature=? where idx=1';
    var fan_flag,humi_flag,chair_flag;

    conn.query(post_sql,params,function(err,rows){
        if(err){console.log(err)}
        else{
            console.log('update dht success');
            }
    })

    conn.query('select fan_flag,humi_flag,chair_flag from switch where idx=1',function(err,rows){
        if(err){console.log(err)}
        else{
              fan_flag = rows[0].fan_flag;
              humi_flag = rows[0].humi_flag;
              chair_flag = rows[0].chair_flag;
              console.log('======================fan_flag : '+fan_flag+'=========================');
              console.log('======================humi_flag : '+humi_flag+'=========================');
              console.log('======================chair_flag : '+chair_flag+'=========================');

    var select_setting_sql = 'select humidity,temperature from user where id=\'admin\'';
    var update_switch_fan_sql = 'update switch set fan=\'';
    var update_switch_humidity_sql = 'update switch set humidifier=\'';

    conn.query(select_setting_sql,function(err,rows){
      if(err){console.log(err)}
      else{
        if(parseInt(JSON.stringify(rows[0].humidity)) >= humidity&&humi_flag==0&&chair_flag==1){
          conn.query(update_switch_humidity_sql+'on\' where idx=1',function(err,rows){
            if(err){console.log(err)}
            else{
                console.log('humidifier >>>>>>> on');
            }
          })
        }else if((parseInt(JSON.stringify(rows[0].humidity)) < humidity&&humi_flag==0)||chair_flag==0){
          conn.query(update_switch_humidity_sql+'off\' where idx=1',function(err,rows){
            if(err){console.log(err)}
            else{
                console.log('humidifier >>>>>>> off');
            }
          })
        }

        if(parseInt(JSON.stringify(rows[0].temperature)) <= temperature&&fan_flag==0&&chair_flag==1){
          //console.log('compare: '+rows[0].temperature+' : '+temperature+' : '+fan_flag+' : '+chair_flag);
          conn.query(update_switch_fan_sql+'on\' where idx=1',function(err,rows){
            if(err){console.log(err)}
            else{
                console.log('fan >>>>>>> on');
            }
          })
        }else if((parseInt(JSON.stringify(rows[0].temperature)) > temperature&&fan_flag==0) ||chair_flag==0){
          //console.log('compare: '+rows[0].temperature+' : '+temperature+' : '+fan_flag+' : '+chair_flag);
          conn.query(update_switch_fan_sql+'off\' where idx=1',function(err,rows){
            if(err){console.log(err)}
            else{
                console.log('fan >>>>>>> off');
            }
          })
        }else{
          //console.log('compare: '+rows[0].temperature+' : '+temperature+' : '+fan_flag+' : '+chair_flag);
          //console.log('===========================pass====================================');
        }
      }
    })//end of select setting conn
  }//end of else
})//end of select conn

     return res.send("POST SUCCESS");
}); //end of post

router.route('/light').get(function(req,res){
  var sql = 'SELECT * FROM light where idx=0';
  //console.log('GET /sensor/light');
  conn.query(sql,function(err,rows){
      if(err){
          console.log(err);
      }else{
          res.send(JSON.stringify(rows));
      } //else
   }); //end query()
})//end of get

router.route('/updateLight').post(function(req,res){
  console.log("Adding light VALUES : "+req.body.lightStatus);

  var newDate = new Date();
  var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  var lightStatus = req.body.lightStatus;
  var params = [time,lightStatus];
  var post_sql = 'update light set time=?,lightStatus=? where idx=0';
  var led_flag,chair_flag;

  conn.query(post_sql,params,function(err,rows){
      if(err){console.log(err)}
      else{
            console.log('update lightStatus :' + req.body.lightStatus);
          }
  })

  conn.query('select led_flag,chair_flag from switch where idx=1',function(err,rows){
      if(err){console.log(err)}
      else{
            led_flag = rows[0].led_flag;
            chair_flag = rows[0].chair_flag;
            console.log('======================led_flag : '+led_flag+'=========================');
            console.log('======================chair_flag : '+chair_flag+'=========================');

      var update_switch_ledStand_sql = 'update switch set ledStand=\'';
      //console.log('****************test********: '+ lightStatus+' : '+led_flag + ' : ' + chair_flag);
      if(lightStatus=='dark'&&led_flag==0&&chair_flag==1){
        conn.query(update_switch_ledStand_sql+'on\' where idx=1',function(err,rows){
          if(err){console.log(err)}
          else{
              console.log('ledStand >>>>>>> on');
          }
        })
      }else if((lightStatus=='bright'&&led_flag==0)||chair_flag==0){
        conn.query(update_switch_ledStand_sql+'off\' where idx=1',function(err,rows){
          if(err){console.log(err)}
          else{
              console.log('ledStand >>>>>>> off');
          }
        })
      }else{
        console.log('==========================led pass');
      }//end of if

}//end of else
})//end of select conn

  return res.send("lightStatus POST SUCCESS");
}); //end of post

module.exports = router;
