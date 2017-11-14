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


function weekAndDay() {

var date = new Date();
var prefixes = ['1', '2', '3', '4', '5'];

return prefixes[0 | (date.getDate()-5) / 7];

}

router.route('/').get(function(req,res){
    var date1 = new Date("12 09 01:00:00 2012");

    res.send(date1);
})



module.exports = router;
