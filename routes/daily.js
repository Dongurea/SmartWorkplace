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

function getMonthstr(month){
  var returnMonth;
  switch(month){
    case '01':
      returnMonth = 'Jan';
      break;
    case '02':
      returnMonth = 'Feb';
      break;
    case '03':
      returnMonth = 'Mar';
      break;
    case '04':
      returnMonth = 'Apr';
      break;
    case '05':
      returnMonth = 'May';
      break;
    case '06':
      returnMonth = 'Jun';
      break;
    case '07':
      returnMonth = 'Jul';
      break;
    case '08':
      returnMonth = 'Aug';
      break;
    case '09':
      returnMonth = 'Sep';
      break;
    case '10':
      returnMonth = 'Oct';
      break;
    case '11':
      returnMonth = 'Nov';
      break;
    case '12':
      returnMonth = 'Dec';
      break;
  }
  return returnMonth;
}

function Maxtime_posture(P1,P2,P3,P4,P5){
  var returnPosture;
  var pMax=0;
  if(P1!=0){pMax=P1;returnPosture='P1';}else{returnPosture='P0';}
  if(pMax==P2){returnPosture = 'P1P2';}else if(pMax<P2){pMax=P2;returnPosture='P2';}
  if(pMax==P3){returnPosture = returnPosture + 'P3';}else if(pMax<P3){pMax=P3;returnPosture='P3';}
  if(pMax==P4){returnPosture = returnPosture + 'P4';}else if(pMax<P4){pMax=P4;returnPosture='P4';}
  if(pMax==P5){returnPosture = returnPosture + 'P5';}else if(pMax<P5){pMax=P5;returnPosture='P5';}
  if(returnPosture=='P1P2P3P4P5'&&P1==0){returnPosture='P0';}
  return returnPosture;
}

var daily_find_sql = 'select * from dailyPostureTime where date=';
var total_daily_find_sql = 'select sum(P1) as P1,sum(P2) as P2,sum(P3) as P3,sum(P4) as P4,sum(P5) as P5,sum(total_sitting_time) as total_sitting_time from dailyPostureTime where date=';

router.route('/').get(function(req,res){
  var added_daily_find_sql = total_daily_find_sql+"\'"+req.query.date+"\'";
  //console.log(added_daily_find_sql);
  conn.query(added_daily_find_sql, function(err,row_get_daily){
    if(err){
      console.log(err);
    } else {
      res.send(JSON.stringify(row_get_daily));
    }
  })
});//end of GET /daily

router.route('/web').get(function(req,res){
  var added_daily_find_sql = total_daily_find_sql+"\'"+req.query.date+"\'";
  var p1,p2,p3,p4,p5=0;
  //console.log(added_daily_find_sql);
  conn.query(added_daily_find_sql, function(err,row_get_daily){
    if(err){
      console.log(err);
    } else {
      p1=row_get_daily[0].P1/60;
      p2=row_get_daily[0].P2/60;
      p3=row_get_daily[0].P3/60;
      p4=row_get_daily[0].P4/60;
      p5=row_get_daily[0].P5/60;

      p1=p1.toFixed(1);
      p2=p2.toFixed(1);
      p3=p3.toFixed(1);
      p4=p4.toFixed(1);
      p5=p5.toFixed(1);

      res.json(
        [
        {name:"P1",hour:p1},
        {name:"P2",hour:p2},
        {name:"P3",hour:p3},
        {name:"P4",hour:p4},
        {name:"P5",hour:p5}
      ]
      );
    }
  })
});//end of GET /daily - for web site Donut chart

router.route('/pertime').get(function(req,res){
  var added_daily_pertime_find_sql = daily_find_sql+"\'"+req.query.date+"\'";
  console.log(added_daily_pertime_find_sql);
  conn.query(added_daily_pertime_find_sql, function(err,row_get_daily){
    if(err){
      console.log(err);
    } else {
      res.send(JSON.stringify(row_get_daily));
    }
  })
}); //end of GET /daily/pertime

router.route('/Web_pertime').get(function(req,res){
  var added_daily_pertime_find_sql = daily_find_sql+"\'"+req.query.date+"\'";

  console.log(added_daily_pertime_find_sql);
  conn.query(added_daily_pertime_find_sql, function(err,row){
    if(err){
      console.log(err);
    } else {
      var start_time=new Array();
      var end_time=new Array();
      var status=new Array();
      var taskname=new Array();
      var returnString=new Array();
      var object;
      for(var i=0;i<row.length;i++){
          start_time[i] = row[i].date.substr(4,2)+' '+row[i].date.substr(6,2)+' '+row[i].time+':00:00 '+row[i].date.substr(0,4);
          end_time[i] = row[i].date.substr(4,2)+' '+row[i].date.substr(6,2)+' '+(row[i].time+1)+':00:00 '+row[i].date.substr(0,4);
          status[i] = Maxtime_posture(row[i].P1,row[i].P2,row[i].P3,row[i].P4,row[i].P5);
          taskname[i] = row[i].date;
          object = new Object();
          object.startDate=start_time[i];
          object.endDate=end_time[i];
          object.taskName=taskname[i];
          object.status=status[i];
          returnString.push(object);
      }
      res.json(returnString);

      //res.send()
      //res.send(JSON.stringify(row));
    }
  })
}); //end of GET /daily/Web_time

module.exports = router;
