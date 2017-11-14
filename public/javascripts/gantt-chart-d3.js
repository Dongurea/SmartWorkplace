/**
 * @author Dimitry Kudrayvtsev
 * @version 2.1
 */
var spuare;
var parette;
var p1p2;
var p1p3;
var p1p4;
var p1p5;
var p2p3;
var p2p4;
var p2p5;
var p3p4;
var p3p5;
var p4p5;

var p1p2p3;
var p1p2p4;
var p1p2p5;
var p1p3p4;
var p1p3p5;
var p1p4p5;
var p2p3p4;
var p2p3p5;
var p2p4p5;
var p3p4p5;

var p1p2p3p4;
var p1p2p3p5;
var p1p3p4p5;
var p2p3p4p5;

var p1p2p3p4p5;

d3.gantt = function() {
  weekchange=document.getElementById("weekSelectW").value;
  
    document.getElementById("circleDay").onclick=function(){circleD();};
    document.getElementById("circleWeek").onclick=function(){circleW();};
    document.getElementById("circleMonth").onclick=function(){circleM();};
    
    document.getElementById("weekSelectW").onchange=changeW;
    document.getElementById("yearSelectD").onchange=changeY;
    document.getElementById("monthSelectD").onchange=changeM;
    document.getElementById("daySelectD").onchange=changeD;
    

    function changeW(){weekchange=document.getElementById("weekSelectW").value; circleW();};
    function changeY(){thisyear=document.getElementById("yearSelectD").value; 
                        switch(setPage){
                          case "day": circleD(); break;
                          case "week": circleW(); break;
                          case "month": circleM(); break;
                        };
                      }
    function changeM(){thismonth=document.getElementById("monthSelectD").value; 
                        switch(setPage){
                          case "day": circleD(); break;
                          case "week": circleW(); break;
                          case "month": circleM(); break;
                        };
                      }
    function changeD(){today=document.getElementById("daySelectD").value; circleD();};
    
//=============DWM SETTING==========================
    function circleD(){
      var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "http://192.168.5.2:3000/daily/Web_pertime?date="+thisyear+thismonth+today, true);
        xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlHttp.onreadystatechange =function() {
      if(xmlHttp.readyState == 4 && xmlHttp.status ==200) {
      xmlDoc=xmlHttp.responseText;
      param=JSON.parse(xmlDoc);
      //time=new Date(param[0].startDate);
      
      for(i=0;i<param.length;i++){
        timeS=new Date(param[i].startDate);
        timeS=timeS.getTime();
        timeE=new Date(param[i].endDate);
        timeE=timeE.getTime();
        param[i].startDate=timeS;
        param[i].endDate=timeE;
      }
      tasks=param;
      taskNames=[thisyear+thismonth+today];
      tasks.sort(function(a, b) {
        return a.startDate - b.startDate;
      });
       format = "%H:%M";
       height;
	    setTypes(taskNames);
      d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
      gantt.redraw(tasks,height);
      
      }//endof 200
      }//endof readyState
      xmlHttp.send();
    };//endof function circleD()
        function circleW(){
      var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "http://192.168.5.2:3000/weekly/perday?month="+thisyear+thismonth+"&week="+weekchange, true);
        xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlHttp.onreadystatechange =function() {
      if(xmlHttp.readyState == 4 && xmlHttp.status ==200) {
      xmlDoc=xmlHttp.responseText;
      param=JSON.parse(xmlDoc);
      //time=new Date(param[0].startDate);
      
      for(i=0;i<param.length;i++){
        timeS=new Date(param[i].startDate);
        timeS=timeS.getTime();
        timeE=new Date(param[i].endDate);
        timeE=timeE.getTime();
        param[i].startDate=timeS;
        param[i].endDate=timeE;
      }
      tasks=param;
      i=0;
      var y=0;
      var flag=0;
      taskNames=[];
      //----add names
      for(i=0;i<param.length;i++){
        for(y=0;y<param.length;y++){
          if(taskNames[y]==param[i].taskName){
            flag=1;
          }else{
            flag=0;
          } 
        }
        if(flag==0){taskNames[i]=param[i].taskName;}
      }//end of for second
      //---End of add names
      tasks.sort(function(a, b) {
        return a.startDate - b.startDate;
      });
       format = "%H:%M";
      height=height+(5*taskNames.length)-15;
	    setTypes(taskNames);
      d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
      gantt.redraw(tasks,height);
      
      }//endof 200
      }//endof readyState
      xmlHttp.send();
    };//endof function circleW()
    
    
        function circleM(){
      var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "http://192.168.5.2:3000/weekly/perweek?month="+thisyear+thismonth, true);
        xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlHttp.onreadystatechange =function() {
      if(xmlHttp.readyState == 4 && xmlHttp.status ==200) {
      xmlDoc=xmlHttp.responseText;
      param=JSON.parse(xmlDoc);
      //time=new Date(param[0].startDate);
      
      for(i=0;i<param.length;i++){
        timeS=new Date(param[i].startDate);
        timeS=timeS.getTime();
        timeE=new Date(param[i].endDate);
        timeE=timeE.getTime();
        param[i].startDate=timeS;
        param[i].endDate=timeE;
      }
      tasks=param;
      i=0;
      var y=0;
      var flag=0;
      taskNames=[];
      //----add names
      for(i=0;i<param.length;i++){
        for(y=0;y<param.length;y++){
          if(taskNames[y]==param[i].taskName){
            flag=1;
          }else{
            flag=0;
          } 
        }
        if(flag==0){taskNames[i]=param[i].taskName;}
      }//end of for second
      //---End of add names
      tasks.sort(function(a, b) {
        return a.startDate - b.startDate;
      });
       format = "%H:%M";
      height;
	    setTypes(taskNames);
      d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
      gantt.redraw(tasks,height);
      
      }//endof 200
      }//endof readyState
      xmlHttp.send();
    };//endof function circleM()
    
//=============End of  DWM SETTING==========================    
    var FIT_TIME_DOMAIN_MODE = "fit";
    var FIXED_TIME_DOMAIN_MODE = "fixed";
    
    var margin = {
	    top : 30,
	    right : 40,
	    bottom : 30,
	    left : 50
    };
    var selector = '#chart2';
    var timeDomainStart = d3.time.day.offset(new Date(),-3);
    var timeDomainEnd = d3.time.hour.offset(new Date(),+3);
    var timeDomainMode = FIT_TIME_DOMAIN_MODE;// fixed or fit
    var taskTypes = [];
    var taskStatus = [];
    var height = document.body.clientHeight/6;
    var width = document.body.clientWidth/2-120;

    var tickFormat = "%H:%M";

    var keyFunction = function(d) {
	return d.startDate + d.taskName + d.endDate;
    };

    var rectTransform = function(d) {
	return "translate(" + x(d.startDate) + "," + y(d.taskName) + ")";
    };

    var x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);

    var y = d3.scale.ordinal().domain(taskTypes).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
    
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format(tickFormat)).tickSubdivide(true)
	    .tickSize(8).tickPadding(8);

    var yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);

    var initTimeDomain = function(tasks) {
	if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
	    if (tasks === undefined || tasks.length < 1) {
		timeDomainStart = d3.time.day.offset(new Date(), -3);
		timeDomainEnd = d3.time.hour.offset(new Date(), +3);
		return;
	    }
	    tasks.sort(function(a, b) {
		return a.endDate - b.endDate;
	    });
	    timeDomainEnd = tasks[tasks.length - 1].endDate;
	    tasks.sort(function(a, b) {
		return a.startDate - b.startDate;
	    });
	    timeDomainStart = tasks[0].startDate;
	}
    };
//========
    var initAxis = function() {
	x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);
	y = d3.scale.ordinal().domain(taskTypes).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
	xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format(tickFormat)).tickSubdivide(true)
		.tickSize(8).tickPadding(8);

	yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);
    };
   var setTypes=function(t){
   taskTypes=t;
   }; 

    
function gantt(tasks) {
	
	initTimeDomain(tasks);
	initAxis();
	
	var svg = d3.select(selector)
	.append("svg")
	.attr("class", "chart2")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.attr("style","font-family: KoPub Dotum")
    .attr("style","font-style: normal")
    .attr("style","font-weight: 300")
    .attr("style","src: url(//cdn.jsdelivr.net/font-kopub/1.0/KoPubDotum-Light.eot)")
    .attr("style","url(//cdn.jsdelivr.net/font-kopub/1.0/KoPubDotum-Light.eot?#iefix) format('embedded-opentype'),url(//cdn.jsdelivr.net/font-kopub/1.0/KoPubDotum-Light.woff) format('woff'), url(//cdn.jsdelivr.net/font-kopub/1.0/KoPubDotum-Light.ttf) format('truetype')")
    .attr("font-size","15")
	.append("g")
        .attr("class", "gantt-chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    spuare=svg.selectAll(".chart");
    //============gradient
    parette = svg.append("svg:defs");
    var gradient = svg.append("svg:defs");

    p1p2=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P1P2").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p1p2.append("svg:stop").attr("offset", "50%").attr("stop-color", "#1F77B4").attr("stop-opacity", 1);
    p1p2.append("svg:stop").attr("offset", "50%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    
    p1p3=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P1P3").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p1p3.append("svg:stop").attr("offset", "50%").attr("stop-color", "#1F77B4").attr("stop-opacity", 1);
    p1p3.append("svg:stop").attr("offset", "50%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    
    p1p4=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P1P4").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p1p4.append("svg:stop").attr("offset", "50%").attr("stop-color", "#1F77B4").attr("stop-opacity", 1);
    p1p4.append("svg:stop").attr("offset", "50%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);

    p1p5=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P1P5").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p1p5.append("svg:stop").attr("offset", "50%").attr("stop-color", "#1F77B4").attr("stop-opacity", 1);
    p1p5.append("svg:stop").attr("offset", "50%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);
    
    p2p3=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P2P3").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p2p3.append("svg:stop").attr("offset", "50%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p2p3.append("svg:stop").attr("offset", "50%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    
    p2p4=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P2P4").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p2p4.append("svg:stop").attr("offset", "50%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p2p4.append("svg:stop").attr("offset", "50%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    
    p2p5=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P2P5").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p2p5.append("svg:stop").attr("offset", "50%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p2p5.append("svg:stop").attr("offset", "50%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);
    
    p3p4=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P3P4").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p3p4.append("svg:stop").attr("offset", "50%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);
    p3p4.append("svg:stop").attr("offset", "50%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    
    p3p5=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P3P5").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p3p5.append("svg:stop").attr("offset", "50%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p3p5.append("svg:stop").attr("offset", "50%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);   
    
    p4p5=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P4P5").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p4p5.append("svg:stop").attr("offset", "50%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    p4p5.append("svg:stop").attr("offset", "50%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);   

    p1p2p3=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P1P2P3").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p1p2p3.append("svg:stop").attr("offset", "33%").attr("stop-color", "#1F77B4").attr("stop-opacity", 1);
    p1p2p3.append("svg:stop").attr("offset", "33%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p1p2p3.append("svg:stop").attr("offset", "66%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p1p2p3.append("svg:stop").attr("offset", "66%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    
    p1p2p4=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P1P2P4").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p1p2p4.append("svg:stop").attr("offset", "33%").attr("stop-color", "#1F77B4").attr("stop-opacity", 1);
    p1p2p4.append("svg:stop").attr("offset", "33%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p1p2p4.append("svg:stop").attr("offset", "66%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p1p2p4.append("svg:stop").attr("offset", "66%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    
    p1p2p5=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P1P2P5").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p1p2p5.append("svg:stop").attr("offset", "33%").attr("stop-color", "#1F77B4").attr("stop-opacity", 1);
    p1p2p5.append("svg:stop").attr("offset", "33%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p1p2p5.append("svg:stop").attr("offset", "66%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p1p2p5.append("svg:stop").attr("offset", "66%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);

    p1p3p4=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P1P3P4").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p1p3p4.append("svg:stop").attr("offset", "33%").attr("stop-color", "#1F77B4").attr("stop-opacity", 1);
    p1p3p4.append("svg:stop").attr("offset", "33%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p1p3p4.append("svg:stop").attr("offset", "66%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p1p3p4.append("svg:stop").attr("offset", "66%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    
    p1p3p5=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P1P3P5").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p1p3p5.append("svg:stop").attr("offset", "33%").attr("stop-color", "#1F77B4").attr("stop-opacity", 1);
    p1p3p5.append("svg:stop").attr("offset", "33%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p1p3p5.append("svg:stop").attr("offset", "66%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p1p3p5.append("svg:stop").attr("offset", "66%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);

    p1p4p5=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P1P4P5").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p1p4p5.append("svg:stop").attr("offset", "33%").attr("stop-color", "#1F77B4").attr("stop-opacity", 1);
    p1p4p5.append("svg:stop").attr("offset", "33%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p1p4p5.append("svg:stop").attr("offset", "66%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p1p4p5.append("svg:stop").attr("offset", "66%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);

    p2p3p4=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P2P3P4").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p2p3p4.append("svg:stop").attr("offset", "33%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p2p3p4.append("svg:stop").attr("offset", "33%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p2p3p4.append("svg:stop").attr("offset", "66%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p2p3p4.append("svg:stop").attr("offset", "66%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);

    p2p3p5=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P2P3P5").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p2p3p5.append("svg:stop").attr("offset", "33%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p2p3p5.append("svg:stop").attr("offset", "33%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p2p3p5.append("svg:stop").attr("offset", "66%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p2p3p5.append("svg:stop").attr("offset", "66%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);
    
    p2p4p5=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P2P4P5").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p2p4p5.append("svg:stop").attr("offset", "33%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p2p4p5.append("svg:stop").attr("offset", "33%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    p2p4p5.append("svg:stop").attr("offset", "66%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    p2p4p5.append("svg:stop").attr("offset", "66%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);
    
    p3p4p5=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P3P4P5").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p3p4p5.append("svg:stop").attr("offset", "33%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p3p4p5.append("svg:stop").attr("offset", "33%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    p3p4p5.append("svg:stop").attr("offset", "66%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    p3p4p5.append("svg:stop").attr("offset", "66%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);

    p1p2p3p4=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P1P2P3P4").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p1p2p3p4.append("svg:stop").attr("offset", "25%").attr("stop-color", "#1F77B4").attr("stop-opacity", 1);
    p1p2p3p4.append("svg:stop").attr("offset", "25%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p1p2p3p4.append("svg:stop").attr("offset", "50%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p1p2p3p4.append("svg:stop").attr("offset", "50%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p1p2p3p4.append("svg:stop").attr("offset", "75%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p1p2p3p4.append("svg:stop").attr("offset", "75%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    
    p1p2p3p5=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P1P2P3P5").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p1p2p3p5.append("svg:stop").attr("offset", "25%").attr("stop-color", "#1F77B4").attr("stop-opacity", 1);
    p1p2p3p5.append("svg:stop").attr("offset", "25%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p1p2p3p5.append("svg:stop").attr("offset", "50%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p1p2p3p5.append("svg:stop").attr("offset", "50%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p1p2p3p5.append("svg:stop").attr("offset", "75%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p1p2p3p5.append("svg:stop").attr("offset", "75%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);
    
    p1p3p4p5=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P1P3P4P5").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p1p3p4p5.append("svg:stop").attr("offset", "25%").attr("stop-color", "#1F77B4").attr("stop-opacity", 1);
    p1p3p4p5.append("svg:stop").attr("offset", "25%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p1p3p4p5.append("svg:stop").attr("offset", "50%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p1p3p4p5.append("svg:stop").attr("offset", "50%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    p1p3p4p5.append("svg:stop").attr("offset", "75%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    p1p3p4p5.append("svg:stop").attr("offset", "75%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);

    p2p3p4p5=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P2P3P4P5").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p2p3p4p5.append("svg:stop").attr("offset", "25%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p2p3p4p5.append("svg:stop").attr("offset", "25%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p2p3p4p5.append("svg:stop").attr("offset", "50%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p2p3p4p5.append("svg:stop").attr("offset", "50%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    p2p3p4p5.append("svg:stop").attr("offset", "75%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    p2p3p4p5.append("svg:stop").attr("offset", "75%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);

    p1p2p3p4p5=svg.append("svg:defs").append("svg:linearGradient").attr("id", "P1P2P3P4P5").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%")
    .attr("y2", "100%").attr("spreadMethod", "pad");
    p1p2p3p4p5.append("svg:stop").attr("offset", "20%").attr("stop-color", "#1F77B4").attr("stop-opacity", 1);
    p1p2p3p4p5.append("svg:stop").attr("offset", "20%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p1p2p3p4p5.append("svg:stop").attr("offset", "40%").attr("stop-color", "#9467BD").attr("stop-opacity", 1);
    p1p2p3p4p5.append("svg:stop").attr("offset", "40%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p1p2p3p4p5.append("svg:stop").attr("offset", "60%").attr("stop-color", "#D62728").attr("stop-opacity", 1);
    p1p2p3p4p5.append("svg:stop").attr("offset", "60%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    p1p2p3p4p5.append("svg:stop").attr("offset", "80%").attr("stop-color", "#FF7F0E").attr("stop-opacity", 1);
    p1p2p3p4p5.append("svg:stop").attr("offset", "80%").attr("stop-color", "#2CA02C").attr("stop-opacity", 1);

    //=============gradient
    spuare.data(tasks, keyFunction).enter()
	   .append("rect")
	   .attr("rx", 5)
     .attr("ry", 5)
     .attr("class", function(d){ 
	     if(taskStatus[d.status] == null){ return "bar";}
	     return taskStatus[d.status];
	     }) 
     .attr("fill", function(d){ 
	     if(taskStatus[d.status] == null){ return "bar";}
	     return "url(#"+taskStatus[d.status]+")";
	     }) 
	   .attr("y", 0)
	   .attr("transform", rectTransform)
	   .attr("height", function(d) { return y.rangeBand(); })
	   .attr("width", function(d) { 
	     return (x(d.endDate) - x(d.startDate)); 
      });
  
	 
	 svg.append("g")
	 .attr("class", "x axis")
	 .attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
	 .transition()
	 .call(xAxis);
	 
	 svg.append("g").attr("class", "y axis").transition().call(yAxis);
	 
	 return gantt;

    };
gantt.redraw=function(tasks,heigth) {
	initTimeDomain(tasks);
	initAxis();
	
        var svg = d3.select(selector)	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);

        var ganttChartGroup = svg.select(".gantt-chart").attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);
        var rect = ganttChartGroup.selectAll("rect").data(tasks, keyFunction);
        
        rect.enter()
         .insert("rect",":first-child")
         .attr("rx", 5)
         .attr("ry", 5)
	       .attr("class", function(d){ 
	           if(taskStatus[d.status] == null){ return "bar";}
	           return taskStatus[d.status];
	         })
         .attr("fill", function(d){ 
	     if(taskStatus[d.status] == null){ return "bar";}
	     return "url(#"+taskStatus[d.status]+")";
	     })  
	 .transition()
	 .attr("transform", rectTransform)
	 .attr("height", function(d) { return y.rangeBand(); })
	 .attr("width", function(d) { 
	     return (x(d.endDate) - x(d.startDate)); 
	     });
	rect.exit().remove();
     
 	 svg.select(".x")
	 .attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
	 .transition()
	 .call(xAxis);
	 
	 svg.select(".y").transition().call(yAxis);
 
	return gantt;
    };//endof redraw!!=========================================
    
    
    gantt.margin = function(value) {
	if (!arguments.length)
	    return margin;
	margin = value;
	return gantt;
    };

    gantt.timeDomain = function(value) {
	if (!arguments.length)
	    return [ timeDomainStart, timeDomainEnd ];
	timeDomainStart = +value[0], timeDomainEnd = +value[1];
	return gantt;
    };

    /**
     * @param {string}
     *                vale The value can be "fit" - the domain fits the data or
     *                "fixed" - fixed domain.
     */
    gantt.timeDomainMode = function(value) {
	if (!arguments.length)
	    return timeDomainMode;
        timeDomainMode = value;
        return gantt;

    };

    gantt.taskTypes = function(value) {
	if (!arguments.length)
	    return taskTypes;
	taskTypes = value;
	return gantt;
    };
    
    gantt.taskStatus = function(value) {
	if (!arguments.length)
	    return taskStatus;
	taskStatus = value;
	return gantt;
    };

    gantt.width = function(value) {
	if (!arguments.length)
	    return width;
	width = +value;
	return gantt;
    };

    gantt.height = function(value) {
	if (!arguments.length)
	    return height;
	height = +value;
	return gantt;
    };

    gantt.tickFormat = function(value) {
	if (!arguments.length)
	    return tickFormat;
	tickFormat = value;
	return gantt;
    };

    gantt.selector = function(value) {
	if (!arguments.length)
	    return selector;
	selector = value;
	return gantt;
    };

    return gantt;
};
