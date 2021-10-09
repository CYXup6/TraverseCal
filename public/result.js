var reci = window.location.href;
num = reci.split('?')[1].split('&')[0];

function gennum(){
  for(i=1;i<=num;i++){
    document.write('<tr><td>'+i+'</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    document.write('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  }
  document.write('<tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    document.write('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  document.write('<tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  document.write('<tr><td>總和:</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
}
function control_az(first,second,third,fourth){
  var deltax = third-first;
  var deltay = fourth-second;
  var az= (Math.atan(deltax/deltay))*180/Math.PI;
  if(deltay<0){
    az += 180;
  }else if (deltax<0) {
    az+=360;
  }

  return az;
}
function shuffle(array) {
  for (i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function diffcal(){
  var para1 = parseInt(reci.split('?')[1].split('&')[((reci.split('?')[1].split('&')).length)-1].split('$')[3]); // 內角:-360 外角:360
  var para2 = parseInt(reci.split('?')[1].split('&')[((reci.split('?')[1].split('&')).length)-1].split('$')[1]); //順時初始方位角:1 逆時初始方位角:-1
  var para3 = parseInt(reci.split('?')[1].split('&')[((reci.split('?')[1].split('&')).length)-1].split('$')[2]); // 順時角:1 逆時角:-1

  cal(para1,para2,para3);
}
function cal(delta_360,delta_sangle,delta_angle){
var count_point = num;
var should_angle = ((count_point*180)+delta_360)*3600;
var sangle = reci.split('?')[1].split('&')[1];
var inner_xpoint =reci.split('?')[1].split('&')[2];
var inner_ypoint = reci.split('?')[1].split('&')[3];
var outer_xpoint = reci.split('?')[1].split('&')[4];
var outer_ypoint = reci.split('?')[1].split('&')[5];
var angle = [];
var angle_second = [];
var distance =[];
for(i=1;i<=count_point;i++){
angle.push(reci.split('?')[1].split('&')[i*2+4]);
angle_second.push(Number((angle[i-1].split('-')[0])*3600)+Number((angle[i-1].split('-')[1])*60)+Number((angle[i-1].split('-')[2])));
distance.push(reci.split('?')[1].split('&')[i*2+5]);
}
var tmp11=angle_second.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);
var total_angle = Math.floor(tmp11/3600) + '-' + Math.floor(tmp11/60)%60 + '-' + tmp11%60;
var tmp32=distance.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);
tmp7='('+inner_xpoint+','+inner_ypoint+')';
var tmp9=control_az(inner_xpoint,inner_ypoint,outer_xpoint,outer_ypoint)*3600+(parseInt(sangle.split('-')[0])*3600+parseInt(sangle.split('-')[1])*60+parseInt(sangle.split('-')[2]))*delta_sangle+angle_second[0]*delta_angle;
if(tmp9>=360*3600){
  tmp9-=360*3600;
}
if(tmp9<0){
  tmp9+=360*3600;
}
var tmp8=  Math.floor(tmp9/3600) + '-' + Math.floor(tmp9/60)%60 + '-' + parseInt(tmp9%60);
var adjust=[];
for(i=0;i<count_point-Math.abs(should_angle-tmp11)%count_point;i++){
  adjust.push(parseInt((should_angle-tmp11)/count_point));
}
for(i=0;i<Math.abs(should_angle-tmp11)%count_point;i++){
  var tmp20=1;
  if((should_angle-tmp11)<0){
    tmp20-=2;
  }
  adjust.push(parseInt((should_angle-tmp11)/count_point)+tmp20);
}
shuffle(adjust);
var tmp28=0;
var tmp15=[];
for(i=1;i<count_point;i++){
  var tmp14=angle_second[(i+1)-1]+adjust[(i+1)-2];
  tmp28+=tmp14;
  var tmp151=Math.floor(tmp14/3600) + '-' + Math.floor(tmp14/60)%60 + '-' +parseInt(tmp14%60);
  tmp15.push(tmp151);
}
var tmp18=angle_second[0]+adjust[adjust.length-1];
tmp28+=tmp18;
var tmp19=Math.floor(tmp18/3600) + '-' + Math.floor(tmp18/60)%60 + '-' + parseInt(tmp18%60);
var tmp30=Math.floor(tmp28/3600) + '-' + Math.floor(tmp28/60)%60 + '-' + parseInt(tmp28%60);
var tmp21=[];
var tmp211=0;
tmp15.reduce(function tmpli(pre,now){tmp211=parseInt(pre.split('-')[0])*3600+parseInt(pre.split('-')[1])*60+parseInt(pre.split('-')[2])+(parseInt(now.split('-')[0])*3600+parseInt(now.split('-')[1])*60+parseInt(now.split('-')[2]))*delta_angle+180*3600;
if(tmp211>=360*3600){
  tmp211-=360*3600;
}
if(tmp211<0){
  tmp211+=360*3600;
}
tmp21.push(tmp211);
return '0-0-'+ tmp211 +''},tmp8);
var tmp24=[];
for(i=0;i<count_point-1;i++){
  tmp24.push(parseInt(tmp21[i]/3600)+'-'+parseInt(tmp21[i]/60)%60+'-'+parseInt(tmp21[i]%60));
}
tmp24.unshift(tmp8);
tmp21.unshift(tmp9);
var tmp39=[];
for(i=0;i<count_point;i++){
  tmp39.push((Math.sin(tmp21[i]/3600*2*Math.PI/360)*distance[i]).toFixed(5));
}
var tmp41=tmp39.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);
var tmp34=[];
var tmp32=distance.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);
for(i=0;i<count_point;i++){
  tmp34.push((tmp39[i]-(distance[i]/tmp32*tmp41)).toFixed(5));
}
var tmp43=tmp34.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);


var tmp60=[];
for(i=0;i<count_point;i++){
  tmp60.push((Math.cos(tmp21[i]/3600*2*Math.PI/360)*distance[i]).toFixed(5));
}
var tmp61=tmp60.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);
var tmp62=[];
for(i=0;i<count_point;i++){
  tmp62.push((tmp60[i]-(distance[i]/tmp32*tmp61)).toFixed(5));
}
var tmp63=tmp62.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);
var tmp46='相對精度:'+((tmp41**2+tmp61**2)**(1/2))/tmp32;


var tmp47=[];
var tmp52=[];
tmp47.push(inner_xpoint);
tmp52.push(inner_ypoint);
for(i=0;i<count_point;i++){
      tmp47.push((Number(tmp34[i])+Number(tmp47[tmp47.length-1])).toFixed(4));
      tmp52.push((Number(tmp62[i])+Number(tmp52[tmp52.length-1])).toFixed(4));
}
var tmp53=[];
for(i=0;i<count_point;i++){
  tmp53.push('('+tmp47[i]+','+tmp52[i]+')');
}
if((((tmp41**2+tmp61**2)**(1/2))/tmp32)>0.0005){document.getElementById('rank').innerHTML='測量精度等級 : 差';}
else if((((tmp41**2+tmp61**2)**(1/2))/tmp32)>0.0001){document.getElementById('rank').innerHTML='測量精度等級 : 普通';}
else{document.getElementById('rank').innerHTML='測量精度等級 : 優良';}
document.getElementById('precise').innerHTML=tmp46;
document.getElementById('dprecise').innerHTML='約等於: 1/'+String(parseInt(1000000000000000/parseInt(((((tmp41**2+tmp61**2)**(1/2))/tmp32).toFixed(15))*1000000000000000)));
var ot = document.getElementById('resulttable');
angle.push(angle[0]);
angle.push(angle[1]);
tmp53.push(tmp53[0]);
tmp53.push(tmp53[1]);
for(i=1;i<=(parseInt(num)+2);i++){
  ot.rows[(i*2)-1].cells[1].innerHTML=angle[i-1];
  ot.rows[(i*2)-1].cells[10].innerHTML=tmp53[i-1];
}

for(i=0;i<(parseInt(num));i++){
  ot.rows[(i+1)*2].cells[5].innerHTML=distance[i];
  ot.rows[(i+1)*2].cells[6].innerHTML=tmp39[i];
  ot.rows[(i+1)*2].cells[7].innerHTML=tmp60[i];
  ot.rows[(i+1)*2].cells[8].innerHTML=tmp34[i];
  ot.rows[(i+1)*2].cells[9].innerHTML=tmp62[i];
}
tmp24.push(tmp8);
for(i=0;i<(parseInt(num)+1);i++){
  ot.rows[(i+1)*2].cells[4].innerHTML=tmp24[i];
}
for(i=1;i<=parseInt(num);i++){
  ot.rows[(i*2)+1].cells[2].innerHTML=adjust[i-1];
}
for(i=1;i<parseInt(num);i++){
  ot.rows[(i*2)+1].cells[3].innerHTML=tmp15[i-1];
}
ot.rows[(i*2)+1].cells[3].innerHTML=tmp19;
ot.rows[(parseInt(num)+2)*2].cells[5].innerHTML=tmp32;
ot.rows[(parseInt(num)+2)*2].cells[1].innerHTML=total_angle;
ot.rows[(parseInt(num)+2)*2].cells[2].innerHTML=should_angle-(angle_second.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0));
ot.rows[(parseInt(num)+2)*2].cells[3].innerHTML=tmp30;
ot.rows[(parseInt(num)+2)*2].cells[6].innerHTML=tmp41.toFixed(2);
ot.rows[(parseInt(num)+2)*2].cells[7].innerHTML=tmp61.toFixed(2);
ot.rows[(parseInt(num)+2)*2].cells[8].innerHTML=tmp43.toFixed(2);
ot.rows[(parseInt(num)+2)*2].cells[9].innerHTML=tmp63.toFixed(2);
ot.rows[1].cells[10].innerHTML=tmp7;
ot.rows[2].cells[4].innerHTML=tmp8;
transx=tmp47;
transy=tmp52;
transx.pop();
transy.pop();
transx.push(outer_xpoint);
transy.push(outer_ypoint);
error_x=tmp41;
error_y=tmp61;
error_side=tmp21;
}
function toprint(){
  var nav = document.getElementById('navigation');
  var btndiv = document.getElementById('btndiv');
  var tablediv = document.getElementById('tablediv');
  var footer = document.getElementById('foot');
  var canvas = document.getElementById('canvas');
  var demo = document.getElementById('demo');
  nav.style.display = 'none';
  demo.style.display = 'none';
  btndiv.style.display = 'none';
  tablediv.style.border = 'none';
  canvas.style.border = 'none';
  footer.style.display = 'none';
  window.print();
  nav.style.display = 'block';
  demo.style.display = 'block';
  btndiv.style.display = 'block';
  tablediv.style.border = '3px solid #e3fdfd';
  footer.style.display = 'block';
  canvas.style.border = '3px solid #ffffd2';


}
function draw() {
  var canvas = document.getElementById('canvas');
  var maxx=transx.reduce(function(pre,now){return Math.max(pre,now);},0);
  var minx=transx.reduce(function(pre,now){return Math.min(pre,now);},transx[0]+1);
  var maxy=transy.reduce(function(pre,now){return Math.max(pre,now);},0);
  var miny=transy.reduce(function(pre,now){return Math.min(pre,now);},transy[0]+1);
  var t = 1000/(Math.max(maxx-minx,maxy-miny)+10);
  if(t<1){
    t = 1000/(Math.max(maxx-minx,maxy-miny)+100);
    transy = transy.map(function(item, index, array){return item*(-1)+maxy+50;});
    transx = transx.map(function(item, index, array){return item = item-minx+50;});
  }
  else{
    t = Math.floor(1000/(Math.max(maxx-minx,maxy-miny)+10));
    transy = transy.map(function(item, index, array){return item*(-1)+maxy+10;});
    transx = transx.map(function(item, index, array){return item = item-minx+10;});
  }
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(6,50);
    ctx.lineTo(6,20);
    ctx.lineTo(9,25);
    ctx.lineTo(6,20);
    ctx.lineTo(3,25);
    ctx.lineTo(6,20);
    ctx.lineTo(6,50);
    ctx.moveTo(3,15);
    ctx.lineTo(3,6);
    ctx.lineTo(9,15);
    ctx.lineTo(9,6);
    ctx.stroke();

    ctx.scale(t,t);
    if(t<1){
      ctx.font = (1/t)*30 + "px Arial";
    }
    ctx.beginPath();
    ctx.moveTo(transx[transx.length-1],transy[transy.length-1]);
    ctx.strokeStyle="#0000ff";
    ctx.strokeText('外',transx[transx.length-1],transy[transy.length-1]);
    ctx.strokeStyle="#000000";
    for(i=0;i<num;i++){
      ctx.lineTo(transx[i],transy[i]);
      ctx.strokeStyle="#0000ff";
      ctx.strokeText(i+1,transx[i],transy[i]);
      ctx.strokeStyle="#000000";
    }
    ctx.lineTo(transx[0],transy[0]);
    if(t<1){
      ctx.scale(1/t,1/t);
    }
    ctx.stroke();
  }

}
function distance_error(){
  var error_aim = Math.atan(error_x/error_y);
  var error_aim2=0;
  if(error_aim<0){
    error_aim+=(Math.PI)*2;
    if(error_aim<=Math.PI){
      error_aim2=error_aim+Math.PI;
    }else{
      error_aim2=error_aim-Math.PI;
    }
  }else{
    if(error_aim<=Math.PI){
      error_aim2=error_aim+Math.PI;
    }else{
      error_aim2=error_aim-Math.PI;
    }
  }

  var disclosure = error_side.map(function(item, index, array){return Math.min(Math.abs(item/3600*2*Math.PI/360-error_aim),Math.abs(item/3600*2*Math.PI/360-error_aim2))});
  var target_side = [];
  var devi = error_side.map(function(item, index, array){return Math.min(Math.abs(item/3600*2*Math.PI/360-error_aim),Math.abs(item/3600*2*Math.PI/360-error_aim2))});;
  for(i=0;i<num;i++){
     target_side.push(disclosure.indexOf(disclosure.reduce(function(pre,now){return Math.min(pre,now);},disclosure[0]+1)));
     disclosure.splice(disclosure.indexOf(disclosure.reduce(function(pre,now){return Math.min(pre,now);},disclosure[0]+1)),1,100);
  }
  if((devi[target_side[1]]-devi[target_side[0]])<0.06){
    target_side=target_side.map(function(item){return item +=1;});
    document.getElementById('de').innerHTML='建議重新測量: '+(target_side[0])+'~'+(target_side[0]+1)+'之間的距離 和 '+(target_side[1])+'~'+(target_side[1]+1)+'之間的距離'
  }else{
    target_side=target_side.map(function(item){return item +=1;});
    document.getElementById('de').innerHTML='建議重新測量: '+(target_side[0])+'~'+(target_side[0]+1)+'之間的距離'
  }
}
function angle_error(){
  var para1=parseInt(reci.split('?')[1].split('&')[((reci.split('?')[1].split('&')).length)-1].split('$')[1]);//順時初始方位角:1 逆時初始方位角:-1
  var para2=parseInt(reci.split('?')[1].split('&')[((reci.split('?')[1].split('&')).length)-1].split('$')[2]);// 順時角:1 逆時角:-1
  var para3=1;
  var xy1 = angle_error2(para1,para2,para3);
  var xy2 = angle_error2(para1,para2*(-1),para3-1);
  var angle_error_xy=[];
  var target_angle=[];
  var varify=[];
  for(i=0;i<(num-1);i++){
    angle_error_xy.push(Math.abs(xy1[0][i]-xy2[0][num-2-i])+Math.abs(xy1[1][i]-xy2[1][num-2-i]));
    varify.push(Math.abs(xy1[0][i]-xy2[0][num-2-i])+Math.abs(xy1[1][i]-xy2[1][num-2-i]));
  }



  angle_error_xy.unshift(Math.abs(xy1[0][xy1[0].length-1]-xy2[0][xy2[0].length-1])+Math.abs(xy1[1][xy1[1].length-1]-xy2[1][xy2[1].length-1]));
  varify.unshift(Math.abs(xy1[0][xy1[0].length-1]-xy2[0][xy2[0].length-1])+Math.abs(xy1[1][xy1[1].length-1]-xy2[1][xy2[1].length-1]));

  for(i=0;i<num;i++){
    target_angle.push(angle_error_xy.indexOf(angle_error_xy.reduce(function(pre,now){return Math.min(pre,now);},angle_error_xy[0]+1)));
    angle_error_xy.splice(angle_error_xy.indexOf(angle_error_xy.reduce(function(pre,now){return Math.min(pre,now);},angle_error_xy[0]+1)),1,999);
  }

  if(varify[target_angle[1]]-varify[target_angle[0]]<0.3){
    target_angle[0]+=1;
    target_angle[1]+=1;
    document.getElementById('ae').innerHTML='建議重新測量: 第'+ target_angle[0]+ '點的觀測角 和 第'+ target_angle[1]+ '點的觀測角';
  }else {
    target_angle[0]+=1;
    document.getElementById('ae').innerHTML='建議重新測量: 第'+ target_angle[0]+ '點的觀測角'
  }

}
function angle_error2(delta_sangle,delta_angle,if1){
  var count_point = num;
  //var should_angle = ((count_point*180)+delta_360)*3600;
  var sangle = reci.split('?')[1].split('&')[1];
  var inner_xpoint =reci.split('?')[1].split('&')[2];
  var inner_ypoint = reci.split('?')[1].split('&')[3];
  var outer_xpoint = reci.split('?')[1].split('&')[4];
  var outer_ypoint = reci.split('?')[1].split('&')[5];
  var angle = [];
  var angle_second = [];
  var distance =[];
  if(if1===1){
    for(i=1;i<=count_point;i++){
    angle.push(reci.split('?')[1].split('&')[i*2+4]);
    angle_second.push(Number((angle[i-1].split('-')[0])*3600)+Number((angle[i-1].split('-')[1])*60)+Number((angle[i-1].split('-')[2])));
    distance.push(reci.split('?')[1].split('&')[i*2+5]);
    }
  }else {
    for(i=count_point;i>0;i--){
    angle.push(reci.split('?')[1].split('&')[i*2+4]);
    angle_second.push(Number((angle[count_point-i].split('-')[0])*3600)+Number((angle[count_point-i].split('-')[1])*60)+Number((angle[count_point-i].split('-')[2])));
    distance.push(reci.split('?')[1].split('&')[i*2+5]);
    }
    angle.unshift(angle[angle.length-1]);
    angle.pop();
    angle_second.unshift(angle_second[angle_second.length-1]);
    angle_second.pop();
  }

  //var tmp11=angle_second.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);
  //var total_angle = Math.floor(tmp11/3600) + '-' + Math.floor(tmp11/60)%60 + '-' + tmp11%60;
  //var tmp32=distance.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);
  //tmp7='('+inner_xpoint+','+inner_ypoint+')';
  var tmp9=control_az(inner_xpoint,inner_ypoint,outer_xpoint,outer_ypoint)*3600+(parseInt(sangle.split('-')[0])*3600+parseInt(sangle.split('-')[1])*60+parseInt(sangle.split('-')[2]))*delta_sangle+angle_second[0]*if1*delta_angle;

  if(tmp9>=360*3600){
    tmp9-=360*3600;
  }
  if(tmp9<0){
    tmp9+=360*3600;
  }
  var tmp8=  Math.floor(tmp9/3600) + '-' + Math.floor(tmp9/60)%60 + '-' + parseInt(tmp9%60);
  //var adjust=[];
  //for(i=0;i<count_point-Math.abs(should_angle-tmp11)%count_point;i++){
    //adjust.push(parseInt((should_angle-tmp11)/count_point));
  //}
  //for(i=0;i<Math.abs(should_angle-tmp11)%count_point;i++){
    //var tmp20=1;
    //if((should_angle-tmp11)<0){
      //tmp20-=2;
    //}
    //adjust.push(parseInt((should_angle-tmp11)/count_point)+tmp20);
  //}
  //shuffle(adjust);
  //var tmp28=0;
  //var tmp15=[];
  //for(i=1;i<count_point;i++){
    //var tmp14=angle_second[(i+1)-1]+adjust[(i+1)-2];
    //tmp28+=tmp14;
    //var tmp151=Math.floor(tmp14/3600) + '-' + Math.floor(tmp14/60)%60 + '-' +parseInt(tmp14%60);
    //tmp15.push(tmp151);
  //}
  //var tmp18=angle_second[0]+adjust[adjust.length-1];
  //tmp28+=tmp18;
  //var tmp19=Math.floor(tmp18/3600) + '-' + Math.floor(tmp18/60)%60 + '-' + parseInt(tmp18%60);
  //var tmp30=Math.floor(tmp28/3600) + '-' + Math.floor(tmp28/60)%60 + '-' + parseInt(tmp28%60);
  var tmp21=[];
  var tmp211=0;
  angle.shift();
  angle.reduce(function tmpli(pre,now){tmp211=parseInt(pre.split('-')[0])*3600+parseInt(pre.split('-')[1])*60+parseInt(pre.split('-')[2])+(parseInt(now.split('-')[0])*3600+parseInt(now.split('-')[1])*60+parseInt(now.split('-')[2]))*delta_angle+180*3600;
  if(tmp211>=360*3600){
    tmp211-=360*3600;
  }
  if(tmp211<0){
    tmp211+=360*3600;
  }
  tmp21.push(tmp211);
  return '0-0-'+ tmp211 +''},tmp8);
  //var tmp24=[];
  //for(i=0;i<count_point-1;i++){
    //tmp24.push(parseInt(tmp21[i]/3600)+'-'+parseInt(tmp21[i]/60)%60+'-'+parseInt(tmp21[i]%60));
  //}
  //tmp24.unshift(tmp8);
  tmp21.unshift(tmp9);
  var tmp39=[];
  for(i=0;i<count_point;i++){
    tmp39.push((Math.sin(tmp21[i]/3600*2*Math.PI/360)*distance[i]).toFixed(5));
  }
  //var tmp41=tmp39.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);
  //var tmp34=[];
  //var tmp32=distance.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);
  //for(i=0;i<count_point;i++){
    //tmp34.push((tmp39[i]-(distance[i]/tmp32*tmp41)).toFixed(5));
  //}
  //var tmp43=tmp34.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);


  var tmp60=[];
  for(i=0;i<count_point;i++){
    tmp60.push((Math.cos(tmp21[i]/3600*2*Math.PI/360)*distance[i]).toFixed(5));
  }
  //var tmp61=tmp60.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);
  //var tmp62=[];
  //for(i=0;i<count_point;i++){
    //tmp62.push((tmp60[i]-(distance[i]/tmp32*tmp61)).toFixed(5));
  //}
  //var tmp63=tmp62.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);
  //var tmp46='相對精度:'+((tmp41**2+tmp61**2)**(1/2))/tmp32;


  var tmp47=[];
  var tmp52=[];
  tmp47.push(0);
  tmp52.push(0);
  for(i=0;i<count_point;i++){
        tmp47.push((Number(tmp39[i])+Number(tmp47[tmp47.length-1])).toFixed(4));
        tmp52.push((Number(tmp60[i])+Number(tmp52[tmp52.length-1])).toFixed(4));
  }
  //var tmp53=[];
  //for(i=0;i<count_point;i++){
    //tmp53.push('('+tmp47[i]+','+tmp52[i]+')');
  //}
  tmp47.shift();
  tmp52.shift();
  return [tmp47,tmp52];

}
