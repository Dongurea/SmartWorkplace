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

var weekly_find_sql = 'select * from weeklyPostureTime where month=';
var monthly_find_sql = 'select sum(P1) as P1,sum(P2) as P2,sum(P3) as P3,sum(P4) as P4,sum(P5) as P5,sum(total_sitting_time) as total_sitting_time from weeklyPostureTime where month=';
var weekly_perday_find_sql = 'select date,time,P1,P2,P3,P4,P5 from dailyPostureTime where date like \"';

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

router.route('/').get(function(req,res){
  var added_weekly_find_sql = weekly_find_sql+"\'"+req.query.month+"\' and week=\'"+req.query.week+"\'";
  console.log(added_weekly_find_sql);
  conn.query(added_weekly_find_sql, function(err,row_get_weekly){
    if(err){
      console.log(err);
    } else {
      res.send(JSON.stringify(row_get_weekly));
    }
  })
});//end of GET /weekly

router.route('/web').get(function(req,res){
  var added_weekly_find_sql = weekly_find_sql+"\'"+req.query.month+"\' and week=\'"+req.query.week+"\'";
  var p1=0,p2=0,p3=0,p4=0,p5=0;
  //console.log(added_daily_find_sql);
  conn.query(added_weekly_find_sql, function(err,row_get_weekly){
    if(err){
      console.log(err);
    } else {
      if(row_get_weekly[0]!=null){
      p1=row_get_weekly[0].P1/60;
      p2=row_get_weekly[0].P2/60;
      p3=row_get_weekly[0].P3/60;
      p4=row_get_weekly[0].P4/60;
      p5=row_get_weekly[0].P5/60;
    }
      p1=p1.toFixed(1);
      p2=p2.toFixed(1);
      p3=p3.toFixed(1);
      p4=p4.toFixed(1);
      p5=p5.toFixed(1);

      res.json([{name:"P1",hour:p1},{name:"P2",hour:p2},{name:"P3",hour:p3},{name:"P4",hour:p4},{name:"P5",hour:p5}]);
    }
  })
});//end of GET /weekly - for web site Donut chart

router.route('/month').get(function(req,res){
  var added_monthly_find_sql = monthly_find_sql+"\'"+req.query.month+"\'";
  console.log(added_monthly_find_sql);
  conn.query(added_monthly_find_sql, function(err,row_get_monthly){
    if(err){
      console.log(err);
    } else {
      res.send(JSON.stringify(row_get_monthly));
    }
  })
}); //end of GET /weekly/month

router.route('/month/web').get(function(req,res){
  var added_weekly_find_sql = monthly_find_sql+"\'"+req.query.month+"\'";
  var p1,p2,p3,p4,p5=0;
  //console.log(added_daily_find_sql);
  conn.query(added_weekly_find_sql, function(err,row_get_daily){
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

      res.json([{name:"P1",hour:p1},{name:"P2",hour:p2},{name:"P3",hour:p3},{name:"P4",hour:p4},{name:"P5",hour:p5}]);
    }
  })
});//end of GET /weekly/month - for web site Donut chart

router.route('/perday').get(function(req,res){
  var added_weekly_perday_find_sql = weekly_perday_find_sql+req.query.month+"%\" and week=\'"+req.query.week+"\'";
  console.log(added_weekly_perday_find_sql);
  conn.query(added_weekly_perday_find_sql, function(err,row){
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
          start_time[i] = row[i].date.substr(4,2)+' 01 '+row[i].time+':00:00 '+row[i].date.substr(0,4);
          end_time[i] = row[i].date.substr(4,2)+' 01 '+(row[i].time+1)+':00:00 '+row[i].date.substr(0,4);
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
    }
  })
});//end of GET /weekly/perday

var perweek_find_sql = 'select date,week,time,sum(P1) as P1,sum(P2) as P2,sum(P3) as P3,sum(P4) as P4, sum(P5) as P5 from dailyPostureTime where date like \"';

router.route('/perweek').get(function(req,res){
  var added_perweek_find_sql = perweek_find_sql+req.query.month+'%\" group by week,time';
  console.log(added_perweek_find_sql);
  conn.query(added_perweek_find_sql, function(err,row){
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
          start_time[i] = row[i].date.substr(4,2)+' 01 '+row[i].time+':00:00 '+row[i].date.substr(0,4);
          end_time[i] = row[i].date.substr(4,2)+' 01 '+(row[i].time+1)+':00:00 '+row[i].date.substr(0,4);
          status[i] = Maxtime_posture(row[i].P1,row[i].P2,row[i].P3,row[i].P4,row[i].P5);
          taskname[i] = row[i].date.substr(2,4)+'-'+row[i].week;
          object = new Object();
          object.startDate=start_time[i];
          object.endDate=end_time[i];
          object.taskName=taskname[i];
          object.status=status[i];
          returnString.push(object);
      }
      res.json(returnString);
    }
  })
});//end of GET /weekly/perday


module.exports = router;
