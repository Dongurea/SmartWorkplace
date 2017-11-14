//Test for uploading
//d3.select("body").append("div").text("PEACE in mind");
var setPage="day";
var nd=new Date();
var today=nd.getDate()<10?"0"+nd.getDate():nd.getDate();
var thismonth=nd.getMonth()+1<10?"0"+(nd.getMonth()+1):nd.getMonth()+1;
var thisyear=nd.getFullYear();
var weekth="1";
var link="http://192.168.5.2:3000/daily/web?date="+thisyear+thismonth+today;
var dataset;
var refresh;
var panel;
var yearSelectD;
var monthSelectD;
var daySelectD;
var weekSelectW;

var total;
var i;
var j;
var legendRectSize;
var legendSpacing;
var legendWidth;
var legend;
var restOfTheData;
var pie;
var w,h;
 
var outerRadius;
var innerRadius;
var color;
var arc;
var svg;
var tooltip;
var path;
var text;
var totaltime;
var minView;

var selectDay = d3.select('#selectDay')
                .append("svg")
                .attr({
                   width:"500",
                   height:"50",
                   class:'selectDay',
                   id:"svgDay"
                });
var day=selectDay.append("circle")
                  .attr({
                    id:"day",
                    cx:10,
                    cy:11,
                    r:7,
                    id:"circleDay"
                  })
                .attr("fill","#0074A9");
var dayT=selectDay.append("text")
              .attr({
                class:"bold",
                id:"dayT",
                x:30,
                y:15
              })
              .text("Day");
var week=selectDay.append("circle")
              .attr({
                id:"week",
                cx:100,
                cy:11,
                r:5,
                id:"circleWeek"
              })
              .attr("fill","gray");
var weekT=selectDay.append("svg:text")
              .attr({
                id:"weekT",
                x:115,
                y:15
              })
              .text("Week");
var month=selectDay.append("circle")
              .attr({
                id:"month",
                cx:185,
                cy:11,
                r:5,
                id:"circleMonth"
              })
              .attr("fill","gray");
var monthT=selectDay.append("svg:text")
              .attr({
                id:"monthT",
                x:200,
                y:15
              })
              .text("Month");

//=========
panel=d3.select('#controlData');

weekSelectW=panel.append("select").attr('id','weekSelectW');
weekSelectW.append("option") .attr('value','1').text('1st');
weekSelectW.append("option") .attr('value','2').text('2nd');
weekSelectW.append("option") .attr('value','3').text('3rd');
weekSelectW.append("option") .attr('value','4').text('4th');

yearSelectD=panel.append("select").attr('id','yearSelectD');
yearSelectD.attr('class','yearSelectD');
yearSelectD.append("option") .attr('value','2015').text('2015');
yearSelectD.append("option") .attr('value','2016').text('2016');
        
monthSelectD=panel.append("select").attr('id','monthSelectD');
monthSelectD.attr('class','monthSelectD');
monthSelectD.append("option") .attr('value','01').text('01');
monthSelectD.append("option") .attr('value','02').text('02');
monthSelectD.append("option") .attr('value','03').text('03');
monthSelectD.append("option") .attr('value','04').text('04');
monthSelectD.append("option") .attr('value','05').text('05');
monthSelectD.append("option") .attr('value','06').text('06');
monthSelectD.append("option") .attr('value','07').text('07');
monthSelectD.append("option") .attr('value','08').text('08');
monthSelectD.append("option") .attr('value','09').text('09');
monthSelectD.append("option") .attr('value','10').text('10');
monthSelectD.append("option") .attr('value','11').text('11');
monthSelectD.append("option") .attr('value','12').text('12');
        
daySelectD=panel.append("select").attr('id','daySelectD');
daySelectD.attr('class','daySelectD');
daySelectD.append("option") .attr('value','01').text('01');
daySelectD.append("option") .attr('value','02').text('02');
daySelectD.append("option") .attr('value','03').text('03');
daySelectD.append("option") .attr('value','04').text('04');
daySelectD.append("option") .attr('value','05').text('05');
daySelectD.append("option") .attr('value','06').text('06');
daySelectD.append("option") .attr('value','07').text('07');
daySelectD.append("option") .attr('value','08').text('08');
daySelectD.append("option") .attr('value','09').text('09');
daySelectD.append("option") .attr('value','10').text('10');
daySelectD.append("option") .attr('value','11').text('11');
daySelectD.append("option") .attr('value','12').text('12');
daySelectD.append("option") .attr('value','13').text('13');
daySelectD.append("option") .attr('value','14').text('14');
daySelectD.append("option") .attr('value','15').text('15');
daySelectD.append("option") .attr('value','16').text('16');
daySelectD.append("option") .attr('value','17').text('17');
daySelectD.append("option") .attr('value','18').text('18');
daySelectD.append("option") .attr('value','19').text('19');
daySelectD.append("option") .attr('value','20').text('20');
daySelectD.append("option") .attr('value','21').text('21');
daySelectD.append("option") .attr('value','22').text('22');
daySelectD.append("option") .attr('value','23').text('23');
daySelectD.append("option") .attr('value','24').text('24');
daySelectD.append("option") .attr('value','25').text('25');
daySelectD.append("option") .attr('value','26').text('26');
daySelectD.append("option") .attr('value','27').text('27');
daySelectD.append("option") .attr('value','28').text('28');
daySelectD.append("option") .attr('value','29').text('29');
daySelectD.append("option") .attr('value','30').text('30');
daySelectD.append("option") .attr('value','31').text('31');
//============
 //select Day buttons 
day.on('click', function() { 
  setPage="day";
  day.attr({r:7}).attr("fill","#0074A9");dayT.attr('class','bold');
  week.attr({r:5}).attr("fill","gray");weekT.attr('class','');
  month.attr({r:5}).attr("fill","gray");monthT.attr('class','');
  link="http://192.168.5.2:3000/daily/web?date="+thisyear+thismonth+today;
  refresh();
  weekSelectW.style("visibility", "hidden");
  yearSelectD.style("visibility", "visible").attr('class','yearSelectD');
  monthSelectD.style("visibility", "visible").attr('class','monthSelectD');
  daySelectD.style("visibility", "visible");
});
week.on('click', function() { 
  setPage="week";
  day.attr({r:5}).attr("fill","gray");dayT.attr('class','');
  week.attr({r:7}).attr("fill","#0074A9");weekT.attr('class','bold');
  month.attr({r:5}).attr("fill","gray");monthT.attr('class','');
  link="http://192.168.5.2:3000/weekly/web?month="+thisyear+thismonth+"&week="+weekth;
  refresh();
  weekSelectW.style("visibility", "visible");
  yearSelectD.style("visibility", "visible").attr('class','yearSelectW');
  monthSelectD.style("visibility", "visible").attr('class','monthSelectW');
  daySelectD.style("visibility", "hidden");
});
month.on('click', function() { 
  setPage="month";
  day.attr({r:5}).attr("fill","gray");dayT.attr('class','');
  week.attr({r:5}).attr("fill","gray");weekT.attr('class','');
  month.attr({r:7}).attr("fill","#0074A9");monthT.attr('class','bold');
  link="http://192.168.5.2:3000/weekly/month/web?month="+thisyear+thismonth;
  refresh();
  weekSelectW.style("visibility", "hidden");
  yearSelectD.attr('class','yearSelectM');
  monthSelectD.attr('class','monthSelectM');
  daySelectD.style("visibility", "hidden");
});
// Onclick function for buttons

//start showing


refresh=function() {
  d3.json(link, function(err,json){ dataset=json;
  total=0;
  i=0;
  j=0;
  for(i=0;i<5;i++){
    console.log("DATA:"+dataset[i].hour);
    j=dataset[i].hour*1;
    total=total+j;
  }//endfor
  
  totaltime.text(function(d) { if(total.toFixed(1)<=0){return "NO DATA";}return (total).toFixed(1); });
  if(total.toFixed(1)<=0){totaltime.attr("font-size","21").attr("fill","gray");}
  else{totaltime.attr("font-size","50").attr("fill","#5CB85C");}
  
  minView.text(function() { if(total.toFixed(1)<=0){return " ";} return "Total sitting time(min)"; });
  text=svg.selectAll('text')
        .data(pie(dataset))
        .transition()
        .duration(200)
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .text(function(d){
            var data=d.data.hour/total*100;
            if(data<=0){return null;}
            if(data<5){return data.toFixed(1)+"";}
            return data.toFixed(2)+"%";
        });
        
  path=svg.selectAll('path')
    .data(pie(dataset))
    .attr({
      d:arc,
      fill:function(d,i){
          switch(d.data.name){
            case "P1": return "#1F77B4"; break;
            case "P2": return "#9467BD"; break;
            case "P3": return "#D62728"; break;
            case "P4": return "#FF7F0E"; break;
            case "P5": return "#2CA02C"; break;
          }
      }
    });
  });//end of d3.json
  
};//endof refresh



d3.json(link, function(error, json) {
  if (error) return console.warn(error);
  dataset = json;
total=0;
i=0;
j=0;
for(i=0;i<5;i++){
console.log("DATA:"+dataset[i].hour);
  j=dataset[i].hour*1;
  total=total+j;
}
console.log("TOTAL:"+total);
pie=d3.layout.pie()
  .value(function(d){return d.hour})
  .sort(null)
  .padAngle(.0);
 
w=300,h=300;
 
outerRadius=w/2;
innerRadius=90;
 
color = [{p1:"#1F77B4"},{p2:"#9467BD"},{p3:"#D62728"},{p4:"#FF7F0E"},{p5:"#2CA02C"}];
 
arc=d3.svg.arc()
  .outerRadius(outerRadius)
  .innerRadius(innerRadius);
 
svg=d3.select("#chart")
  .append("svg")
  .attr({
      width:w,
      height:h,
      class:'shadow'
  }).append('g')
  .attr({
      transform:'translate('+w/2+','+h/2+')'
  });
tooltip = d3.select('#chart')                               // NEW
          .append('div')                                                // NEW
          .attr('class', 'tooltip');                                    // NEW
                      
        tooltip.append('div')                                           // NEW
          .attr('class', 'label');                                      // NEW
             
        tooltip.append('div')                                           // NEW
          .attr('class', 'count');                                      // NEW


 

path=svg.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr({
      d:arc,
      fill:function(d,i){
          switch(d.data.name){
            case "P1": return "#1F77B4"; break;
            case "P2": return "#9467BD"; break;
            case "P3": return "#D62728"; break;
            case "P4": return "#FF7F0E"; break;
            case "P5": return "#2CA02C"; break;
          }
      }
  });

path.on('mouseover', function(d) {                            // NEW
            var total = d3.sum(dataset.map(function(d) {                // NEW
              return d.count;                                           // NEW
            }));                                                        // NEW
            var percent = Math.round(1000 * d.data.hour / total) / 10; // NEW
            tooltip.select('.label').html(d.data.name);           // NEW
            tooltip.select('.count').html(d.data.hour+"H");
            tooltip.style('display', 'block');
            var to=d3.select('.tooltip');
            to
              .style("left",Math.max(0, d3.event.pageX - 15)+"px")
              .style("top",(d3.event.pageY + 15)+"px")
              .style("background",d3.select(this).style("fill"));

          });        
path.on('mouseout', function() {                              // NEW
            tooltip.style('display', 'none');                           // NEW
          });                

path.transition()
  .duration(1000)
  .attrTween('d', function(d) {
      var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
      return function(t) {
          return arc(interpolate(t));
      };
  });
//=====select ZONE=====Day


yearSelectD.select("[value='"+thisyear+"']").attr('selected','selected');
monthSelectD.select("[value='"+thismonth+"']").attr('selected','selected');
daySelectD.select("[value='"+today+"']").attr('selected','selected');
weekSelectW.style("visibility", "hidden");
//=====select ZONE=====Day
weekSelectW.on('change', function(){
  weekth=this.options[this.selectedIndex].value;
  link="http://192.168.5.2:3000/weekly/web?month="+thisyear+thismonth+"&week="+weekth;
  refresh();
});
yearSelectD.on('change', function(){
  thisyear=this.options[this.selectedIndex].value;
  switch(setPage){
    case 'day': 
      link="http://192.168.5.2:3000/daily/web?date="+thisyear+thismonth+today;
      refresh();
      break;
    case 'week': 
      link="http://192.168.5.2:3000/weekly/web?month="+thisyear+thismonth+"&week="+weekth;
      refresh();
      break;
    case 'month': 
      link="http://192.168.5.2:3000/weekly/month/web?month="+thisyear+thismonth;
      refresh();
      break;
  }
});
monthSelectD.on('change', function(){
  thismonth=this.options[this.selectedIndex].value;
  switch(setPage){
    case 'day': 
      link="http://192.168.5.2:3000/daily/web?date="+thisyear+thismonth+today;
      refresh();
      break;
    case 'week': 
      link="http://192.168.5.2:3000/weekly/web?month="+thisyear+thismonth+"&week="+weekth;
      refresh();
      break;
    case 'month': 
      link="http://192.168.5.2:3000/weekly/month/web?month="+thisyear+thismonth;
      refresh();
      break;
  }
});
daySelectD.on('change', function(){
  today=this.options[this.selectedIndex].value;
  link="http://192.168.5.2:3000/daily/web?date="+thisyear+thismonth+today;
  refresh();
});
//===select change
restOfTheData=function(){
    text=svg.selectAll('text')
        .data(pie(dataset))
        .enter()
        .append("text")
        .transition()
        .duration(200)
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", ".6em")
        .attr("text-anchor", "middle")
        .text(function(d){
            var data=d.data.hour/total*100;
            if(data<=0){return null;}
            if(data<5){return data.toFixed(0)+"";}
            return data.toFixed(2)+"%";
        })
        .style({
            fill:'#fff',
            'font-size':'12px',
            'font-family' : 'sans-serif'
        });
totaltime=svg.append("svg:text")
  .attr("dy", "0.5em")
  .attr("dx",svg.height/2)
  .attr("text-anchor", "middle")
  .attr("style","font-family: KoPub Dotum")
  .attr("style","font-style: normal")
  .attr("style","font-weight: 700")
  .attr("style","src: url(//cdn.jsdelivr.net/font-kopub/1.0/KoPubDotum-Bold.eot)")
  .attr("style","url(//cdn.jsdelivr.net/font-kopub/1.0/KoPubDotum-Bold.eot?#iefix) format('embedded-opentype'),url(//cdn.jsdelivr.net/font-kopub/1.0/KoPubDotum-Bold.woff) format('woff'),url(//cdn.jsdelivr.net/font-kopub/1.0/KoPubDotum-Bold.ttf) format('truetype');")
  .attr("class", "total")
  .attr("font-size","50")
  .attr("fill","#5CB85C")
  .text(function(d) { if(total.toFixed(1)<=0){return "No Data";}return total.toFixed(1); });

minView=svg.append("svg:text")
    .attr("dy", "-2em")
    .attr("dx", "0.4em")
    .attr("text-anchor", "middle")
    .attr("style","font-family: KoPub Dotum")
    .attr("style","font-style: normal")
    .attr("style","font-weight: 300")
    .attr("style","src: url(//cdn.jsdelivr.net/font-kopub/1.0/KoPubDotum-Light.eot)")
    .attr("style","url(//cdn.jsdelivr.net/font-kopub/1.0/KoPubDotum-Light.eot?#iefix) format('embedded-opentype'),url(//cdn.jsdelivr.net/font-kopub/1.0/KoPubDotum-Light.woff) format('woff'), url(//cdn.jsdelivr.net/font-kopub/1.0/KoPubDotum-Light.ttf) format('truetype')")
    .attr("font-size","13")
    .attr("fill","#5CB85C")
    .text("Total sitting time(min)");


};

setTimeout(restOfTheData,1000);

});

//end showing 