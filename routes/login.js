var express = require('express');
var router = express.Router();
var fs=require('fs');//HTML file Load

/* GET Login page */
router.get('/', function(req, res) {
  //res.send('Hello login page');
  // res.render('form');
  fs.readFile('views/loginPage.html',function(err,data){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });

})
router.post('/loginss',function(req,res){
  res.send('OKKK');
})
// GET Login Success page
router.post('/loginsuccess',function(req,res){
  //res.send('Hello login success!!');
  //res.render('arloginSuccess',{_title:'Jade',time:Date(),title:req.body.title,
  //description:req.body.description})
  console.log(req.body.id+' '+req.body.pw);
  //res.send(req.body.id+','+req.body.pw);
  res.send('OK');

})
module.exports = router;
