ganttdrawsetting();
/*
{"startDate":new Date("12 09 01:00:00 2012"),"endDate":new Date("12 09 02:00:00 2012"),"taskName":"today","status":"P1"},
{"startDate":new Date("12 09 02:00:00 2012"),"endDate":new Date("12 09 03:00:00 2012"),"taskName":"today","status":"P2"},
{"startDate":new Date("12 09 06:29:53 2012"),"endDate":new Date("12 09 06:34:04 2012"),"taskName":"today","status":"P3"},
{"startDate":new Date("12 09 05:35:21 2012"),"endDate":new Date("12 09 06:21:22 2012"),"taskName":"today","status":"P4"},
{"startDate":new Date("12 09 05:00:06 2012"),"endDate":new Date("12 09 05:05:07 2012"),"taskName":"today","status":"P5"},
{"startDate":new Date("12 09 03:46:59 2012"),"endDate":new Date("12 09 04:54:19 2012"),"taskName":"today","status":"P4"},
{"startDate":new Date("12 09 04:02:45 2012"),"endDate":new Date("12 09 04:48:56 2012"),"taskName":"today","status":"P3"}];
*/
function ganttdrawsetting() {
//todaySetting
var nd=new Date();
var today=nd.getDate()<10?"0"+nd.getDate():nd.getDate();
var thismonth=nd.getMonth()+1<10?"0"+(nd.getMonth()+1):nd.getMonth()+1;
var thisyear=nd.getFullYear();
//selected Date Setting
var settingDWM;
var settingDate;
//Making gantt chart;
var tasks;
var taskStatus;
var taskStatus;
var maxDate;
var minDate;
var format;
var gantt;
var xmlDoc;
var param;

var i=0;
var timeS=0;
var timeE=0;

var time;
var day;
var month;
var year;


var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://192.168.5.2:3000/daily/Web_pertime?date="+thisyear+thismonth+today, true);
    xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlHttp.onreadystatechange =function() {
      if(xmlHttp.readyState == 4 && xmlHttp.status ==200) {
      xmlDoc=xmlHttp.responseText;
      param=JSON.parse(xmlDoc);

      //time=new Date(param[0].startDate); 
      /*day=time.getDate()<10?"0"+time.getDate():time.getDate();
      month=time.getMonth()<9?"0"+(time.getDate()+1):time.getMonth()+1;
      year=time.getFullYear();*/
      
      console.log(year);
      for(i=0;i<param.length;i++){
        timeS=new Date(param[i].startDate);
        timeS=timeS.getTime();
        timeE=new Date(param[i].endDate);
        timeE=timeE.getTime();
        param[i].startDate=timeS;
        param[i].endDate=timeE;
      }
      tasks=param;
      
      //}
      taskStatus = {
        "P0" : "P0",
        "P1" : "P1",
        "P2" : "P2",
        "P3" : "P3",
        "P4" : "P4",
        "P5" : "P5",
        "P1P2" : "P1P2",
        "P1P3" : "P1P3",
        "P1P4" : "P1P4",
        "P1P5" : "P1P5",
        "P2P3" : "P2P3",
        "P2P4" : "P2P4",
        "P2P5" : "P2P5",
        "P3P4" : "P3P4",
        "P3P5" : "P3P5",
        "P4P5" : "P4P5",
        "P1P2P3" : "P1P2P3",
        "P1P2P4" : "P1P2P4",
        "P1P2P5" : "P1P2P5",
        "P1P3P4" : "P1P3P4",
        "P1P3P5" : "P1P3P5",
        "P1P4P5" : "P1P4P5",
        "P2P3P4" : "P2P3P4",
        "P2P3P5" : "P2P3p5",
        "P2P4P5" : "P2P4p5",
        "P3P4P5" : "P3P4P5",
        "P1P2P3P4" : "P1P2P3P4",
        "P1P2P4P5" : "P1P2P4P5",
        "P1P3P4P5" : "P1P3P4P5",
        "P2P3P4P5" : "P2P3P4P5",
        "P1P2P3P4P5" : "P1P2P3P4P5"
      };
      taskNames=[thisyear+thismonth+today];

      tasks.sort(function(a, b) {
        return a.endDate - b.endDate;
      });
      if(tasks!=""){
        maxDate = tasks[tasks.length - 1].endDate;
        tasks.sort(function(a, b) {
          return a.startDate - b.startDate;
        });
        minDate = tasks[0].startDate;
      }else{
       maxDate="07 20 10:00:00 2016";
        minDate="07 20 00:00:00 2016";
      }//end of else
      format = "%H:%M";

      gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
      gantt(tasks);
      }//end of 200
    }//end of readystate
  xmlHttp.send();

};//end of gantt();


function dayGantt(){
};
function weekGantt(){
};
function monthGantt(){
};