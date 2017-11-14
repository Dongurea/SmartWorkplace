var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var conn = mysql.createConnection({
host:'localhost',
user:'root',
database:'Fibonacci',
password:'111111'
});

var sql = 'insert into user (id,password,email,tel) values (?,?,?,?)';
var params;

router.route('/').post(function(req,res){
  params = [req.body.id,req.body.password,req.body.email,req.body.tel];
	conn.query(sql,params,function(err,rows){
	    if(err){
	    	console.log(err);
        res.send([{signal:"NO"}]);
	    }else{
	      res.send([{signal:"OK"}]);
	    } //else
	 }); //end query()

})//end of get


module.exports = router;
