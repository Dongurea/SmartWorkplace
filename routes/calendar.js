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

function changeDate(date){
  var returnDate

  returnDate = date.substr(0,4)+'-'+date.substr(4,2)+'-'+date.substr(6,2);

  return returnDate;
}

router.route('/').get(function(req,res){
  conn.query("select * from calendar", function(err, rows){
			if(err){
				console.log(rows);
				res.send(err);
			}else {
				console.log(rows);
				res.json(rows);
			}//end of else
		});//end of query
})

router.route('/success').get(function(req,res){
var i=0,j=0;
var rowsForColor=new Array();
  conn.query("select date,sum(P5) as P5,sum(total_sitting_time) as total_sitting_time from dailyPostureTime group by date", function(err, rows){
			if(err){
				console.log(rows);
				res.send(err);
			}else {
				console.log(rows);
        for(i=0;i<rows.length;i++){
          if(rows[i].total_sitting_time!=0&&((rows[i].P5)>=(rows[i].total_sitting_time/3))){
            rowsForColor[j]={"start":changeDate(rows[i].date),'rendering': 'background','color':'#ADDEBF'};
            j++;
          }//end of if
        }//end of for
        res.json(rowsForColor);
			}//end of else
		});//end of query
})//end of colored backGround

router.route('/addSchedule').post(function(req,res){
  conn.query("insert into calendar (title,start,end) values('"+req.body.title+"','"
  +req.body.start+"','"+req.body.end+"')",function(err,rows){
			if(err){
				console.log(err);
				res.json([{signal:"NO"}]);
			}else{
				res.json([{signal:"OK"}]);
				console.log("Successfully, add new schedule!!");
			}//end of else
		});//end of query
})

router.route('/changeSchedule').put(function(req,res){
  var oldtitle=req.body.oldtitle;
	var title=req.body.title;
	var start=req.body.start;
	var end=req.body.end;
  conn.query("update calendar set title='"+title+"',start='"+start+
		"',end='"+end+"' where title='"+oldtitle+"'", function(err, rows){
			if (err){
				console.log(err);
				res.json([{signal:"NO"}]);
			}else{
				console.log("UPDATE schedule");
				res.json([{signal:"OK"}]);
			}//end of else
		});
})

router.put('/deleteSchedule', function(req, res){
	console.log('delete schedule');
	var oldtitle=req.body.oldtitle;
	console.log('title:'+oldtitle);
	conn.query("delete from calendar where title='"+oldtitle+"'",function(err, rows){
				if(err){
					console.log(err);
					res.json([{signal:"NO"}]);
				}else{
					console.log("DELETE schedule");
					res.json([{signal:"OK"}]);
				}
			});
});//end of delcal

module.exports = router;
