var express = require('express');
var router = express.Router();
var fs=require('fs');//HTML file Load

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.send('OK');
  fs.readFile('routes/loginPage.html',function(err, data){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);});						//html file OPEN
  //res.send(JSON.stringify(req.body.id));
  console.log();//LOGIN ID,PW Print
  console.log(req.body.id);
  console.log(req.body.pw);
});


// // MainPage/:id/:pw -  GET / id와 pw로 확인하기
// router.get('/:id/:pw', function(req, res) {
//         return res.send("[{id:"+req.params.id+"},{pw:"+req.params.pw+"}]");
// });

//need post method here

module.exports = router;
