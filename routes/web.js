var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//var session= require('express-session');
//var mysqlstore=require('express-mysql-session')(session);
var http = require('http');
var fs = require('fs');
var url = require('url');

var conn = mysql.createConnection({
host: 'localhost',
port: 3306,
user:'root',
database: 'Fibonacci',
password:'111111'
});
/*var option={
	host:'192.168.5.209',
	port:3306,
	user:'root',
	password:'1234',
	database:'user'
};*/
//var sessionstore=new mysqlstore(option);

conn.connect(function(err) {
		if(err){
		console.log('MYSQL connection error');
		console.log(err);
		throw err;
		}
		});
var sql = 'SELECT * FROM user';
var path = '/home/whyj/nodejs/Fibonacci/public/htmls/';
var imgpath='/home/whyj/nodejs/Fibonacci/public/images/';
var csspath='//';



var pid;
var id;
var pw;
var params;
var sess;
router.get('/get', function(req,res){
	console.log('GET all users');
	conn.query(sql ,function(err,rows, field){
	    if(err){
	    	console.log(err+"::ERROR!");
			throw err;
	    }else{
	     res.json(rows);
		 console.log(rows);
	      // for(var i=0;i<rows.length;i++){
	      //   console.log(rows[i].idx);
	      // } //for
	    } //else
	 }); //end query()
	//conn.end();
});//end of get
router.get('/login', function(req,res){
		console.log("GET: OPEN login page");
		fs.readFile(path+'loginPage.html' ,function(err,data){//file load
				if(err){
				console.log(err);
				}else{
				res.writeHead(200,{'Content-Type':'text/html'});
				res.end(data);
				}
		})//end of readFile
});//end of get method

router.get('/logout', function(req,res){
		console.log("LOGOUT method");
		req.session.destroy(function(err){
			res.clearCookie('ses');
			console.log('LOGOUT Successfully');
		});
});

//===============
router.get('/home', function(req,res){
		console.log("GET: OPEN login page");
		fs.readFile(path+'mainPage.html' ,function(err,data){//file load
				if(err){
				console.log(err);
				}else{
				res.writeHead(200,{'Content-Type':'text/html'});
				res.end(data);
				}
		})//end of readFile
});//end of get method
router.get('/signuppage', function(req,res){
		console.log("GET: OPEN login page");
		fs.readFile(path+'signupPage.html' ,function(err,data){//file load
				if(err){
				console.log(err);
				}else{
				res.writeHead(200,{'Content-Type':'text/html'});
				res.end(data);
				}
		})//end of readFile
});//end of get method

router.get('/calendar', function(req,res){
		console.log("GET: OPEN login page");
		fs.readFile(path+'calendarPage.html' ,function(err,data){//file load
				if(err){
				console.log(err);
				}else{
				res.writeHead(200,{'Content-Type':'text/html'});
				res.end(data);
				}
		})//end of readFile
});//end of get method

router.get('/calendar/add', function(req,res){
		console.log("GET: OPEN login page");
		fs.readFile(path+'calendarPage.html' ,function(err,data){//file load
				if(err){
				console.log(err);
				}else{
				res.writeHead(200,{'Content-Type':'text/html'});
				res.end(data);
				}
		})//end of readFile
});//end of get method

router.get('/calendar/modify', function(req,res){
		console.log("GET: OPEN login page");
		fs.readFile(path+'calendarPage.html' ,function(err,data){//file load
				if(err){
				console.log(err);
				}else{
				res.writeHead(200,{'Content-Type':'text/html'});
				res.end(data);
				}
		})//end of readFile
});//end of get method

router.get('/posture', function(req,res){
		console.log("GET: OPEN login page");
		fs.readFile(path+'posturedataPage.html' ,function(err,data){//file load
				if(err){
				console.log(err);
				}else{
				res.writeHead(200,{'Content-Type':'text/html'});
				res.end(data);
				}
		})//end of readFile
});//end of get method

router.get('/setting', function(req,res){
		console.log("GET: OPEN login page");
		fs.readFile(path+'devicesettingPage.html' ,function(err,data){//file load
				if(err){
				console.log(err);
				}else{
				res.writeHead(200,{'Content-Type':'text/html'});
				res.end(data);
				}
		})//end of readFile
});//end of get method
//===============


router.get('/power', function(req,res){
		console.log("GET: ALL power");		
		conn.query("select * from power", 
				function(err, rows, field){
		if(err){
			console.log(err);
			res.send(err);
		}else{
			console.log(rows);
			res.json(rows);

		}//endof else
	});//end of query
});//end of get power

router.get('/setting', function(req,res){
		console.log("GET: all Setting for devices");	
		conn.query("select * from setting", 
				function(err, rows, field){
			if(err){
				console.log(err);
				res.send(err);
			}else{
				console.log(rows);
				res.json(rows);
			}//end of else
		});//end of query
});//end of get setting

router.get('/calendarData', function(req,res){
		console.log("GET: all calendar Data");
		conn.query("select * from calendar", 
				function(err, rows, field){
			if(err){
				console.log(rows);
				res.send(err);
			}else {
				console.log(rows);
				res.json(rows);
			}//end of else	
		});//end of query
});//end of get calendar data
router.get('/status', function(req,res){
		console.log("GET: all status");
		conn.query("select * from status",
				function(err, rows, field){
			if(err){
				console.log(err);
				res.json([{signal:"NO"}]);
			} else {
				console.log("Sucessfully, get all status");
				res.json(rows);
				console.log("userid::"+req.session.userid);
			}//end of else
		});//end of query
});//end of get status

router.post('/logincheck', function(req,res){
		console.log("POST: Login check:)"+req.body.id);
		conn.query("select * from user where id ='"+req.body.id+"'", function(err, rows, field){

			if(err){
				console.log(err);
				throw err;
			}else if (rows[0]!=undefined){
			var id=rows[0].id;
			var pw=rows[0].password;
			if(pw==req.body.pw){
			res.json([{signal:"OK"}]);
			console.log("MATCHED!::"+rows[0]);
			
			/*req.session.regenerate(function(err){
				if(err){
					console.log(err);
				}else{
					req.session.userid=id;
					req.session.userpw=pw;
					req.session.save(function(){
						//res.redirect('/');		
					});
					console.log(req.session.userid);
					console.log(req.session.userpw);
				}
			});*/
			
			} else{
				res.json([{signal:"NO"}]);
				console.log("PW DOESEN'T MATCH!");
			}
			}else{
			res.json([{signal:"NO"}]);
			console.log("NOTHING MATCHED!!");
			}//else end
		})

});//end of post method

router.post('/signup', function(req,res){
		console.log("POST: SIGNUP!");	
		var id=req.body.id;
		var pw=req.body.pw;
		var phone=req.body.phone;
		var email=req.body.email;
		conn.query("insert into signup (id,pw,phone,email)values('"
				+id+"','"+ pw+"','"+phone+"','"+email+"')", function(err,rows,field){
			
		if(err){
			console.log(err);
			res.json([{signal:"NO"}]);
		}else {
			res.json([{signal:"OK"}]);
			console.log("Signup:: Successful!!");
		}
		});
		
});//end of Post signup

router.post('/addSchedule', function(req,res){
		console.log("POST: add Schedule");	
		var title=req.body.title;
		var start=req.body.start;
		var end=req.body.end;

		conn.query("insert into calendar (title,start,end) values('"+
				title+"','"+start+"','"+end+"')", 
				function(err,rows,field){
			if(err){
				console.log(err);
				res.json([{signal:"NO"}]);
			}else{
				res.json([{signal:"OK"}]);
				console.log("Successfully, add new schedule!!");
			}//end of else
		});//end of query
});//end of post add schedule

router.put('/changeSetting', function(req, res){
		console.log("POST: change setting value for device");
	var device=req.body.device;
	var value=req.body.value;
	console.log("device::"+device+"/value::"+value);
	conn.query("update setting set setting='"+value+"' where device='"+device+"'",
			function(err, rows, field){
			
		if(err){
			console.log(err);
			res.json([{signal:"NO"}]);
		} else{
			console.log("changed values successful");
			res.json([{signal:"OK"}]);
		}
	});//endof query
});//end of put

router.put('/dev/:device', function(req, res){
	console.log("PUT: change power value for device");
	var device=req.params.device;
	var power=req.body.power;
	console.log("device:"+device+"power"+power);
	conn.query("update power set power='"+power+"' where device='"+device+"'", 
			function(err, rows, field){
		if(err){
			console.log(err);
			res.json([{signal:"NO"}]);
		} else{
			console.log("Change power value successful");
			res.json([{signal:"OK"}]);
		}	
	});
		
});

router.put('/upcal', function(req, res){
	console.log("PUT: update schedule");	
	var oldtitle=req.body.oldtitle;
	var title=req.body.title;
	var start=req.body.start;
	var end=req.body.end;
	console.log("1."+title+"2."+start+"3."+end+"4."+oldtitle);
	conn.query(
		"update calendar set title='"+title+"',start='"+start+
		"',end='"+end+"' where title='"+oldtitle+"'",
			function(err, rows, field){
			if (err){
				console.log(err);
				res.json([{signal:"NO"}]);
			}else{
				console.log("UPDATE schedule");
				res.json([{signal:"OK"}]);
			}//end of else
		});
});

router.put('/delcal', function(req, res){
	console.log('delete schedule');
	var oldtitle=req.body.oldtitle;
	console.log('title:'+oldtitle);
	conn.query(
			"delete from calendar where title='"+oldtitle+"'",
			function(err, rows, field){
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
