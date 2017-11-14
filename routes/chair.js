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

var sql = 'SELECT * FROM fsr';
var trunc_sql = 'truncate table fsr';
var sql_get_dailyPostureTime = 'select * from dailyPostureTime';
var sql_insert_dailyPostureTime = 'INSERT INTO dailyPostureTime (date,week,time,P1,P2,P3,P4,P5,total_sitting_time) values(?,?,?,?,?,?,?,?,?)';
var time;
var fsr_lh, fsr_rh, fsr_lb, fsr_rb, fsr_ll, fsr_rl;
var insert_sql;
var params;
var curr_pos = "P0";
var P0_count = 0;
var posture_count = [0,0,0,0,0];
var trunk_flag = 0;
var w_flag = 0;
var posture_totime = [0,0,0,0,0];
var total_sitting_time = 0;
var dateCheck;

//var week_sql = "select 1+week(sysdate())-week(date_add(last_day(date_sub(sysdate(),interval '1' month)),interval '1' day)) as weekly from dual";

function updateWeeklyPostureTime(month,week,get_weekly_rows){

  var update_wtot_p1 = 0;
  var update_wtot_p2 = 0;
  var update_wtot_p3 = 0;
  var update_wtot_p4 = 0;
  var update_wtot_p5 = 0;
  var update_wtot_sitting_time = 0;
  var uw = week;
  var um = month;

  //add time for each posture
  update_wtot_p1 = get_weekly_rows[get_weekly_rows.length-1].P1 + posture_totime[0];
  update_wtot_p2 = get_weekly_rows[get_weekly_rows.length-1].P2 + posture_totime[1];
  update_wtot_p3 = get_weekly_rows[get_weekly_rows.length-1].P3 + posture_totime[2];
  update_wtot_p4 = get_weekly_rows[get_weekly_rows.length-1].P4 + posture_totime[3];
  update_wtot_p5 = get_weekly_rows[get_weekly_rows.length-1].P5 + posture_totime[4];
  update_wtot_sitting_time = update_wtot_p1+update_wtot_p2+update_wtot_p3+update_wtot_p4+update_wtot_p5;
  // console.log(update_total_p5);

  //send to db
  //console.log(rows_get_daily);
  conn.query("update weeklyPostureTime set P1=? where month="+um+" AND week="+uw,update_wtot_p1,function(err,rows){
    if(err){console.log(err)}
    else{
     //console.log(rows);
    }
  })
  conn.query("update weeklyPostureTime set P2=? where month="+um+" AND week="+uw,update_wtot_p2,function(err,rows){
    if(err){console.log(err)}
    else{
     //console.log(rows);
    }
  })
  conn.query("update weeklyPostureTime set P3=? where month="+um+" AND week="+uw,update_wtot_p3,function(err,rows){
    if(err){console.log(err)}
    else{
     //console.log(rows);
    }
  })
  conn.query("update weeklyPostureTime set P4=? where month="+um+" AND week="+uw,update_wtot_p4,function(err,rows){
    if(err){console.log(err)}
    else{
     //console.log(rows);
    }
  })
  conn.query("update weeklyPostureTime set P5=? where month="+um+" AND week="+uw,update_wtot_p5,function(err,rows){
    if(err){console.log(err)}
    else{
      //console.log(rows);
    }
  })
  conn.query("update weeklyPostureTime set total_sitting_time=? where month="+um+" AND week="+uw,update_wtot_sitting_time,function(err,rows){
    if(err){console.log(err)}
    else{
     //console.log(rows);
    }
  })
}
function insertWeeklyPostureTime(month,week){
  //get dailyPostureTime posture values
  var total = 0;
  var week_insert_params;
  var daily_pos = [0,0,0,0,0];
  var insert_month,insert_week;
  insert_month = month;
  insert_week = week;
  //get posture values from dailyPostureTime table
  conn.query('select * from dailyPostureTime',function(err,daily_rows){
    if(err){console.log(err)}

    daily_pos[0] = daily_rows[daily_rows.length-1].P1;
    daily_pos[1] = daily_rows[daily_rows.length-1].P2;
    daily_pos[2] = daily_rows[daily_rows.length-1].P3;
    daily_pos[3] = daily_rows[daily_rows.length-1].P4;
    daily_pos[4] = daily_rows[daily_rows.length-1].P5;

    total = daily_pos[0]+daily_pos[1]+daily_pos[2]+daily_pos[3]+daily_pos[4];
    week_insert_params = [month,week,daily_pos[0],daily_pos[1],daily_pos[2],daily_pos[3],daily_pos[4],total];
    conn.query('insert into weeklyPostureTime (month,week,P1,P2,P3,P4,P5,total_sitting_time) values(?,?,?,?,?,?,?,?)',week_insert_params,function(err,rows){
      if(err){console.log(err)}
      else{
        console.log('insert into weeklyPostureTime done!');
      }
    })
  })
  //console.log('============================insert weeklyPostureTime end==============================');
}

function getMonthNum(){
  var dt = new Date();
  var month = dt.toFormat('YYYYMM');
  return month;
}

function getWeekNum() {

var date = new Date();
var prefixes = ['1', '2', '3', '4', '5'];

return prefixes[0 | date.getDate() / 7];

}


function saveWeeklyPostureTime(){
  //console.log('function saveWeeklyPostureTime start');
  var month,week;
  //get week
  week = getWeekNum();
  //console.log(week);
  //get month
  month = getMonthNum();
  //console.log(month);

  conn.query('select * from weeklyPostureTime',function(err,get_weekly_rows){
    if(err){console.log(err)}
    if((get_weekly_rows=='')||(get_weekly_rows[get_weekly_rows.length-1].month!=month)||(get_weekly_rows[get_weekly_rows.length-1].week!=week)){
      //insert
      insertWeeklyPostureTime(month,week);
    }else{
      //update
      updateWeeklyPostureTime(month,week,get_weekly_rows);
    }
  })
  //console.log('function saveWeeklyPostureTime end');

}

function trunkRealPTable(){
    //console.log('truncate real time posture table...');
    conn.query(trunc_sql,function(err,rows){
      if(err){
        console.log(err);
      }else {
        console.log('truncated table');
      }
    })
}

function insertdailyPostureTime(daily_params){
  conn.query(sql_insert_dailyPostureTime,daily_params,function(err,rows){
    if(err){console.log(err)}
    else {
      console.log('insert dailyPostureTime done!');
    }
  })
}

function updatedailyPostureTime(rows_get_daily){
  //update P1
  var update_total_P1 = 0;
  var update_total_P2 = 0;
  var update_total_P3 = 0;
  var update_total_P4 = 0;
  var update_total_P5 = 0;
  var update_total_sitting_time = 0;

  //add time for each posture
  update_total_P1 = rows_get_daily[rows_get_daily.length-1].P1 + posture_totime[0];
  update_total_P2 = rows_get_daily[rows_get_daily.length-1].P2 + posture_totime[1];
  update_total_P3 = rows_get_daily[rows_get_daily.length-1].P3 + posture_totime[2];
  update_total_P4 = rows_get_daily[rows_get_daily.length-1].P4 + posture_totime[3];
  update_total_P5 = rows_get_daily[rows_get_daily.length-1].P5 + posture_totime[4];
  update_total_sitting_time = update_total_P1+update_total_P2+update_total_P3+update_total_P4+update_total_P5;
  // console.log(update_total_P5);
  var curd = rows_get_daily[rows_get_daily.length-1].date;
  var curt = rows_get_daily[rows_get_daily.length-1].time;

  //send to db
  //console.log(rows_get_daily);

  conn.query('update dailyPostureTime set P1=? where date='+curd+' and time='+curt,update_total_P1,function(err,rows){
    if(err){console.log(err)}
    else{
      //console.log(rows);
    }
  })
  conn.query('update dailyPostureTime set P2=? where date='+curd+' and time='+curt,update_total_P2,function(err,rows){
    if(err){console.log(err)}
    else{
      //console.log(rows);
    }
  })
  conn.query('update dailyPostureTime set P3=? where date='+curd+' and time='+curt,update_total_P3,function(err,rows){
    if(err){console.log(err)}
    else{
      //console.log(rows);
    }
  })
  conn.query('update dailyPostureTime set P4=? where date='+curd+' and time='+curt,update_total_P4,function(err,rows){
    if(err){console.log(err)}
    else{
      //console.log(rows);
    }
  })
  conn.query('update dailyPostureTime set P5=? where date='+curd+' and time='+curt,update_total_P5,function(err,rows){
    if(err){console.log(err)}
    else{
      //console.log(rows);
    }
  })
  conn.query('update dailyPostureTime set total_sitting_time=? where date='+curd+' and time='+curt,update_total_sitting_time,function(err,rows){
    if(err){console.log(err)}
    else{
      //console.log(rows);
    }
  })

}

function saveDailyPostureTime(){
  //console.log(posture_count);
  var insert_flag = 0;
  posture_totime = [0,0,0,0,0];
  total_sitting_time = 0;
  for(var i=0;i<5;i++){
    posture_totime[i] = posture_count[i]*2;   //time for each posture
    total_sitting_time += posture_totime[i];      //time for total posture time
  }
  //save time for each posture --> posture table(1 day

  var dt = new Date();
  var day = dt.toFormat('YYYYMMDD');
  var time = dt.toFormat('HH24');
  var week = getWeekNum();
  var daily_params = [day,week,time,posture_totime[0],posture_totime[1],posture_totime[2],posture_totime[3],posture_totime[4],total_sitting_time];
  //var sql_get_conflict_date = 'select date, count(*) as num from dailyPostureTime group by date having num>0';

  conn.query(sql_get_dailyPostureTime, function(err,rows_get_daily){
    if(err){
      console.log(err);
    } else {
      if(rows_get_daily==''){
        console.log('First insert dailyPostureTime data..');
        //console.log(day);
        conn.query(sql_insert_dailyPostureTime,daily_params,function(err,rows){
          if(err){console.log(err)}
          else{
            //console.log(rows_get_daily);
          }
        })//end insert
      }//if Empty
      else {
        //if none Empty
        conn.query('select * from dailyPostureTime where date='+day+' and time='+time,function(err,rows){
          if(err){
            console.log(err);
          }else{
            if(rows==''){
              console.log('=====There is no data for this time..insert!!======');
              insertdailyPostureTime(daily_params);
            }else {
              console.log('======This time data is exist, update now..========');
              updatedailyPostureTime(rows_get_daily);
              //console.log('======save >> updatedailyPostureTime end==========');
            }
          }
        })
      }
    }
  })
  trunk_flag = 1;

}//end function


router.route('/').get(function(req,res){
	console.log('GET /chair');
  console.log(curr_pos);
  res.send(JSON.stringify(curr_pos));

})//end of get

.post(function(req,res){
  //-----get time values
  var dt = new Date();
  var d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');
  // type = req.body.type;
  // description = req.body.description;
  // author = req.body.author;
  //initialize values

  //-----get sensor values and setting
  fsr_lh = req.body.FSR_LH;
  fsr_rh = req.body.FSR_RH;
  fsr_ll = req.body.FSR_LL;
  fsr_rl = req.body.FSR_RL;
  fsr_lb = req.body.FSR_LB;
  fsr_rb = req.body.FSR_RB;
  time = d;

  //-----calculate posture
  //--P1 : left leg twisted
  //--P2 : right leg twisted
  //--P3 : foward heap
  //--P4 : curve back
  //--P5 : good posture
  //---P1 or P2
  //posture algorithm
  if(fsr_ll==0&&fsr_rl==0&&fsr_lh==0&&fsr_rh==0&&fsr_lb==0&&fsr_rb==0){
    console.log("[POSTURE]==========================>empty");
    curr_pos = "P0";
    P0_count += 2;
    var lock_time,fixed_lock_time;
    conn.query('select lock_time from user where id=\'admin\'',function(err,row){
      lock_time=row[0].lock_time;
      fixed_lock_time= lock_time;

      conn.query('update switch set chair_flag=0 where idx=1',function(err){
        if(err){console.log(err)}
        else{
          console.log("change chair_flag = 0");
        }
      })

      if(P0_count == fixed_lock_time){
        conn.query('update switch set computer=\'lock\' where idx=1',function(err){
          if(err){console.log(err)}
          else{
            console.log("[computer]==========================>LOCK");
            setTimeout(function(){
              conn.query('update switch set com_flag=1 where idx=1',function(err){
                if(err){console.log(err)}
                else{
                }
              }) //end of conn
            },5000);
          }
        })
      }
    });

  } else if((fsr_ll==0&&fsr_rl!=0)||(fsr_ll!=0&&fsr_rl==0)){
    if(fsr_ll==0&&fsr_rl!=0){
      console.log("[POSTURE]==========================>left leg twisted");
      curr_pos = "P1";
      P0_count = 0;
      conn.query('update switch set computer=\'sitting\',com_flag=0,chair_flag=1 where idx=1',function(err){
        if(err){console.log(err)}
        else{
          console.log("[computer]========>Sitting : com_flag=0 : chair_flag=1");
        }
      })
    }else{
      console.log("[POSTURE]==========================>right leg twisted");
      curr_pos = "P2";
      P0_count = 0;
      conn.query('update switch set computer=\'sitting\',com_flag=0,chair_flag=1 where idx=1',function(err){
        if(err){console.log(err)}
        else{
          console.log("[computer]========>Sitting : com_flag=0 : chair_flag=1");
        }
      })
    }
  }else{
    if(fsr_lh==0&&fsr_rh==0){
      console.log("[posture]==========================>forwarded heap");
      curr_pos = "P3";
      P0_count = 0;
      conn.query('update switch set computer=\'sitting\',com_flag=0,chair_flag=1 where idx=1',function(err){
        if(err){console.log(err)}
        else{
          console.log("[computer]========>Sitting : com_flag=0 : chair_flag=1");
        }
      })
    }
    else if(fsr_lb==0&&fsr_rb==0){
      console.log("[posture]==========================>back curve");
      curr_pos = "P4";
      P0_count = 0;
      conn.query('update switch set computer=\'sitting\',com_flag=0,chair_flag=1 where idx=1',function(err){
        if(err){console.log(err)}
        else{
          console.log("[computer]========>Sitting : com_flag=0 : chair_flag=1");
        }
      })
    } else {
      console.log("[posture]==========================>GOOD posture");
      curr_pos = "P5";
      P0_count = 0;
      conn.query('update switch set computer=\'sitting\',com_flag=0,chair_flag=1 where idx=1',function(err){
        if(err){console.log(err)}
        else{
          console.log("[computer]========>Sitting : com_flag=0 : chair_flag=1");
        }
      })
    }
  }
  //query DB
  conn.query(sql,function(err,rows){
    if(err){
      console.log(err);
    } else {
      //console.log(rows.length);
      if(rows.length>29){
        posture_count = [0,0,0,0,0];
        //counting for each posture..
        for(var i=0;i<rows.length;i++){
          //console.log(rows[i].Posture);
          if(rows[i].Posture == "P1"){
            posture_count[0] += 1;
          } else if(rows[i].Posture == "P2"){
            posture_count[1] += 1;
          } else if(rows[i].Posture == "P3"){
            posture_count[2] += 1;
          } else if(rows[i].Posture == "P4"){
            posture_count[3] += 1;
          } else if(rows[i].Posture == "P5"){
            posture_count[4] += 1;
          }
        }//for
        console.log('posture_count reset');
        saveDailyPostureTime();
        saveWeeklyPostureTime();
        console.log('trunk_flag:' + trunk_flag);
        if(trunk_flag==1){
          trunkRealPTable();
          trunk_flag = 0;
        }
      }//if
      //if real time posture table is not full
      else {
        //console.log('fsr post query start');
        params = [time,fsr_lh,fsr_rh,fsr_ll,fsr_rl,fsr_lb,fsr_rb,curr_pos];
        insert_sql = 'INSERT INTO fsr (time,FSR_LH,FSR_RH,FSR_LL,FSR_RL,FSR_LB,FSR_RB,Posture) VALUES(?,?,?,?,?,?,?,?)';
        conn.query(insert_sql,params,function(err,rows){
          if(err){console.log(err)}
          else{
            //console.log('insert into fsr...');
          }
        })//end post query
      }//else
    }// get query else
  })//end get query
});//end post

module.exports = router;
