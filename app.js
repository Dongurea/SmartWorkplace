var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  database:'Fibonacci',
  password:'111111'
});

var spawn = require('child_process').spawn;
var child = spawn('mosquitto_pub',['-h','192.168.5.2:1883','-t','humidifier','-m','off']);
var child2 = spawn('mosquitto_pub',['-h','192.168.5.2:1883','-t','fan','-m','off']);
var child3 = spawn('mosquitto_pub',['-h','192.168.5.2:1883','-t','ledStand','-m','off']);

var humidifier_message='off';
var fan_message='off';
var led_message='off';

setInterval(function(){
  conn.query('select * from switch where idx=1',function(err,row){
      if(err){
        console.log(err);
      }else{
        if(humidifier_message!=row[0].humidifier){
          child = spawn('mosquitto_pub',['-h','192.168.5.2','-t','humidifier','-m',row[0].humidifier]);
          humidifier_message=row[0].humidifier;
        }
        // if(fan_message!=row[0].fan){
          child2 = spawn('mosquitto_pub',['-h','192.168.5.2','-t','fan','-m',row[0].fan]);
        //   fan_message=row[0].fan;
        // }
        // if(led_message!=row[0].ledStand){
          child3 = spawn('mosquitto_pub',['-h','192.168.5.2','-t','ledStand','-m',row[0].ledStand]);
        //   led_message=row[0].ledStand;
        // }
      }
  });
},2000);

child.stdout.on("data",function(data){
  console.log(data.toSring());
})
child.stderr.on("data",function(data){
  console.log(data.toString());
})
child.on("exit",function(code){
  console.log("child process has been quit :"+code);
})

var routes = require('./routes/index');
var users = require('./routes/users');
var chair = require('./routes/chair');
var ar_login = require('./routes/ar_login');
var login = require('./routes/login');
var daily = require('./routes/daily');
var weekly = require('./routes/weekly');
var test = require('./routes/test');
var swc = require('./routes/switch');
var adduser = require('./routes/adduser');
var sensor = require('./routes/sensor')
var settings = require('./routes/settings');
var calendar = require('./routes/calendar');
var web = require('./routes/web');
var app = express();
app.locals.pretty=true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/source',express.static('public/images/loginPage'));//imagefile folder static path

app.use('/', routes);
app.use('/users', users);
app.use('/chair',chair);
app.use('/ar_login',ar_login);
app.use('/login',login);
app.use('/daily',daily);
app.use('/weekly',weekly);
app.use('/test',test);
app.use('/switch',swc);
app.use('/adduser',adduser);
app.use('/sensor',sensor);
app.use('/calendar',calendar);
app.use('/settings',settings);
app.use('/smartwp',web);
//app.use('/ar_login/loginsuccess',ar_login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
