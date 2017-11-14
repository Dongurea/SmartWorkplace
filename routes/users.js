var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var conn = mysql.createConnection({
host:'localhost',
user:'root',
database:'Fibonacci',
password:'111111'
});

var sql = 'SELECT * FROM user where id=';
var added_sql;
var idx;
var user_id;
var user_pw;
var params;

router.route('/').post(function(req,res){
	added_sql = sql+'\''+req.body.id+'\'';
	//console.log(added_sql);
	conn.query(added_sql,function(err,rows){
	    if(err){
	    	console.log(err);
	    }else if (rows[0]!=undefined){
	      if(rows[0].password == req.body.password){
					res.send([{signal:"OK"}]);
					console.log('login success');
				}else{
					res.send([{signal:"NO"}]);
					console.log('login failed');
				}
	    } //else
	 }); //end query()
}); //end of post

module.exports = router;
