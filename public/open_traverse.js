var reci = window.location.href;
num = reci.split('?')[1].split('&')[0];
function gennum(){
  document.write('<tr><td>A</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    document.write('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  for(i=1;i<=parseInt(num);i++){
    document.write('<tr><td>'+i+'</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    document.write('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  }

    document.write('<tr><td>B</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

  document.write('<tr><td>總和:</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
}
function diffcal(){
  var para = parseInt(reci.split('?')[1].split('&')[((reci.split('?')[1].split('&')).length)-1].split('$')[1]); // 順時角:1 逆時角:-1

  cal(para);
}
function cts(angle){
    return parseInt((angle.split('-'))[0])*3600+parseInt((angle.split('-'))[1])*60+parseInt((angle.split('-'))[2]);
  }
function ctn(seconds){
    return (parseInt(seconds/3600)).toString()+"-"+(parseInt(seconds/60)%60).toString()+"-"+(seconds%60).toString();
  }
function cpaz(first,second){
    var deltax = parseFloat(second.split('_')[0])-parseFloat(first.split('_')[0]);
    var deltay = parseFloat(second.split('_')[1])-parseFloat(first.split('_')[1]);
    var az = (Math.atan(deltax/deltay))*180/Math.PI;

    if(deltay <0){
        az +=180;
      }
    else if(deltax <0){
        az +=360;
      }

    return az*3600;
  }

function shuffle(array) {
    for (i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

function cal(delta_angle){
var cp = num;
cp = parseInt(cp);
var ic = [];
for(i=1;i<5;i++){
    ic.push(reci.split('?')[1].split('&')[i]);
  }

var ia = [];
for(i=5;i<(cp+5);i++){
    ia.push(reci.split('?')[1].split('&')[i]);
  }
var id = [];
for(i=(cp+5);i<(cp+cp+4);i++){
    id.push(reci.split('?')[1].split('&')[i]);
  }

var ias = [];
for(i=0;i<cp;i++){
    ias.push(cts(ia[i]));
  }
var ad1 = (cpaz(ic[0],ic[1])+(ias.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0))*delta_angle+180*3600*cp);
while(ad1>=360*3600){
    ad1 -= 360*3600;
  }
while(ad1<0){
      ad1 += 360*3600;
  }
if(360*3600-Math.abs(cpaz(ic[2],ic[3])-ad1) < Math.abs(cpaz(ic[2],ic[3])-ad1)){
  if(cpaz(ic[2],ic[3])>ad1){
    var ad = (360*3600-Math.abs(cpaz(ic[2],ic[3])-ad1))*(-1);
  }
  else{
    var ad = 360*3600-Math.abs(cpaz(ic[2],ic[3])-ad1);
  }
}
else{
  var ad = parseInt(cpaz(ic[2],ic[3])-ad1);
}

var adjust = [];
for(i=0;i<(cp-Math.abs(ad)%cp);i++){

    adjust.push(parseInt(ad/cp));


}

for(i=0;i<(Math.abs(ad)%cp);i++){
    if(ad < 0){
        adjust.push(parseInt(ad/cp)-1);
      }
    else{
        adjust.push(parseInt(ad/cp)+1);
      }
      }
shuffle(adjust);
adjust.push(adjust.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0));
var aaa = [];
for(i=0;i<cp;i++){
    aaa.push(ctn(cts(ia[i])+adjust[i]));
  }
var azl = [];
azl.push(ctn(parseInt((cpaz(ic[0],ic[1])).toFixed(0))));
for(i=0;i<cp;i++){
  if(delta_angle==1){
      if(cts(azl[i])+cts(aaa[i])+180*3600 >= 720*3600){
          azl.push(ctn(cts(azl[i])+cts(aaa[i])+180*3600-720*3600));
        }
      else if(cts(azl[i])+cts(aaa[i])+180*3600 >= 360*3600){
          azl.push(ctn(cts(azl[i])+cts(aaa[i])+180*3600-360*3600));
        }
      else{
          azl.push(ctn(cts(azl[i])+cts(aaa[i])+180*3600));
        }
      }
    else{
      if(cts(azl[i])+cts(aaa[i])*delta_angle-180*3600 <(-360*3600)){
          azl.push(ctn(cts(azl[i])+cts(aaa[i])*delta_angle-180*3600+720*3600));
        }
      else if(cts(azl[i])+cts(aaa[i])*delta_angle-180*3600 < 0){
          azl.push(ctn(cts(azl[i])+cts(aaa[i])*delta_angle-180*3600+360*3600));
        }
      else{
          azl.push(ctn(cts(azl[i])+cts(aaa[i])*delta_angle-180*3600));
        }
    }
        }
var xl = [];
for(i=0;i<(cp-1);i++){
    xl.push(Math.sin((cts(azl[i+1])/3600)*2*Math.PI/360)*id[i]);
  }
var yl = [];
for(i=0;i<(cp-1);i++){
    yl.push(Math.cos((cts(azl[i+1])/3600)*2*Math.PI/360)*id[i]);
}
var xd = (parseFloat(ic[2].split('_')[0])-parseFloat(ic[1].split('_')[0]))-(xl.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0));
var yd = (parseFloat(ic[2].split('_')[1])-parseFloat(ic[1].split('_')[1]))-(yl.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0));
var acc = (xd**2+yd**2)**(1/2)/id.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);
var acct = '1/'+parseInt((id.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0)/(xd**2+yd**2)**(1/2)).toFixed(0)).toString();
var xadj = [];
for(i=0;i<(cp-1);i++){
    xadj.push((xd*id[i]/id.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0))+xl[i]);
  }
var yadj = [];
for(i=0;i<(cp-1);i++){
    yadj.push((yd*id[i]/id.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0))+yl[i]);
    }
var rc = [];
rc.push(ic[0]);
rc.push(ic[1]);
for(i=0;i<(cp-1);i++){
        rc.push(((parseFloat(rc[rc.length-1].split('_')[0])+xadj[i]).toFixed(3)) +"_" + ((parseFloat(rc[rc.length-1].split('_')[1])+yadj[i]).toFixed(3) ));
      }
rc.push(ic[3]);
rc = rc.map(function(item, index, array){return item.split('_')[0]+","+item.split('_')[1]});
if(acc>0.0005){document.getElementById('rank').innerHTML='測量精度等級 : 差';}
else if(acc>0.0001){document.getElementById('rank').innerHTML='測量精度等級 : 普通';}
else{document.getElementById('rank').innerHTML='測量精度等級 : 優良';}
document.getElementById('precise').innerHTML='相對精度:'+ acc;
document.getElementById('dprecise').innerHTML='約等於: '+acct;
var ot = document.getElementById('resulttable');
for(i=1;i<=(parseInt(num)+2);i++){
ot.rows[(i*2)-1].cells[10].innerHTML="("+rc[i-1]+")";
}

for(i=2;i<=(parseInt(num)+1);i++){
ot.rows[(i*2)-1].cells[1].innerHTML=ia[i-2];

}
for(i=1;i<(parseInt(num));i++){
  ot.rows[(i+1)*2].cells[5].innerHTML=id[i-1];
  ot.rows[(i+1)*2].cells[6].innerHTML=xl[i-1].toFixed(3);
  ot.rows[(i+1)*2].cells[7].innerHTML=yl[i-1].toFixed(3);
  ot.rows[(i+1)*2].cells[8].innerHTML=xadj[i-1].toFixed(3);
  ot.rows[(i+1)*2].cells[9].innerHTML=yadj[i-1].toFixed(3);
}
for(i=0;i<(parseInt(num)+1);i++){
  ot.rows[(i+1)*2].cells[4].innerHTML=azl[i];
}
for(i=1;i<=parseInt(num);i++){
  ot.rows[(i*2)+1].cells[2].innerHTML=adjust[i-1];
}
for(i=1;i<parseInt(num)+1;i++){
  ot.rows[(i*2)+1].cells[3].innerHTML=aaa[i-1];
}
ot.rows[(parseInt(num)+2)*2].cells[5].innerHTML=id.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0).toFixed(3);
ot.rows[(parseInt(num)+2)*2].cells[6].innerHTML=xl.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0).toFixed(3);
ot.rows[(parseInt(num)+2)*2].cells[7].innerHTML=yl.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0).toFixed(3);
ot.rows[(parseInt(num)+2)*2].cells[8].innerHTML=xadj.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0).toFixed(3);
ot.rows[(parseInt(num)+2)*2].cells[9].innerHTML=yadj.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0).toFixed(3);


transx=rc.map(function(item, index, array){return item.split(',')[0]});
transy=rc.map(function(item, index, array){return item.split(',')[1]});
error_x=xd;
error_y=yd;
azl.pop();
azl.shift();
error_side=azl;
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
  var t = 1000/(Math.max(maxx-minx,maxy-miny)+100);
  if(t<0.3){
    transy = transy.map(function(item, index, array){return (item*(-1)+maxy+50);});
    transx = transx.map(function(item, index, array){return (item-minx+50);});
  }
  else{
    transy = transy.map(function(item, index, array){return (item*(-1)+maxy+50)*t;});
    transx = transx.map(function(item, index, array){return (item-minx+50)*t;});
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
    if(t<0.3){


      ctx.scale(t,t);

      ctx.beginPath();

      ctx.moveTo(transx[0],transy[0]);
      ctx.strokeStyle="#0000ff";
      ctx.font = "30px Arial";
      ctx.strokeText("A",transx[0],transy[0]);
      ctx.strokeStyle="#000000";
      for(i=1;i<=parseInt(num);i++){
        ctx.lineTo(transx[i],transy[i]);
        ctx.strokeStyle="#0000ff";

        ctx.strokeText(i,transx[i],transy[i]);

        ctx.strokeStyle="#000000";
      }
      ctx.lineTo(transx[i],transy[i]);

      ctx.strokeStyle="#0000ff";

      ctx.strokeText("B",transx[i],transy[i]);
      ctx.strokeStyle="#000000";
      ctx.scale(1/t,1/t);

      ctx.stroke();
    }
    else{
      ctx.beginPath();
      ctx.moveTo(transx[0],transy[0]);
      ctx.strokeStyle="#0000ff";
      ctx.font = "30px Arial";
      ctx.strokeText("A",transx[0],transy[0]);
      ctx.strokeStyle="#000000";
      for(i=1;i<=parseInt(num);i++){
        ctx.lineTo(transx[i],transy[i]);
        ctx.strokeStyle="#0000ff";
        ctx.strokeText(i,transx[i],transy[i]);


        ctx.strokeStyle="#000000";
      }
      ctx.lineTo(transx[i],transy[i]);

      ctx.strokeStyle="#0000ff";

      ctx.strokeText("B",transx[i],transy[i]);
      ctx.strokeStyle="#000000";
      ctx.scale(1/t,1/t);
      ctx.stroke();
    }



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

  var disclosure = error_side.map(function(item, index, array){return Math.min(Math.abs(cts(item)/3600*2*Math.PI/360-error_aim),Math.abs(cts(item)/3600*2*Math.PI/360-error_aim2))});
  var target_side = [];
  var devi = error_side.map(function(item, index, array){return Math.min(Math.abs(cts(item)/3600*2*Math.PI/360-error_aim),Math.abs(cts(item)/3600*2*Math.PI/360-error_aim2))});;
  for(i=0;i<parseInt(num)-1;i++){
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

  var para2=parseInt(reci.split('?')[1].split('&')[((reci.split('?')[1].split('&')).length)-1].split('$')[1]);// 順時角:1 逆時角:-1
  var para3=1;
  var xy1 = angle_error2(para2,para3);
  var xy2 = angle_error2(para2*(-1),para3-1);
  var angle_error_xy=[];
  var target_angle=[];
  var varify=[];
  for(i=0;i<num;i++){
    angle_error_xy.push(Math.abs(xy1[0][i]-xy2[0][num-1-i])+Math.abs(xy1[1][i]-xy2[1][num-1-i]));
    varify.push(Math.abs(xy1[0][i]-xy2[0][num-1-i])+Math.abs(xy1[1][i]-xy2[1][num-1-i]));
  }

  //angle_error_xy.unshift(Math.abs(xy1[0][xy1[0].length-1]-xy2[0][xy2[0].length-1])+Math.abs(xy1[1][xy1[1].length-1]-xy2[1][xy2[1].length-1]));
  //varify.unshift(Math.abs(xy1[0][xy1[0].length-1]-xy2[0][xy2[0].length-1])+Math.abs(xy1[1][xy1[1].length-1]-xy2[1][xy2[1].length-1]));
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
function angle_error2(delta_angle,if1){
  var cp = num;
  cp = parseInt(cp);
  if(if1===1){
    var ic = [];
    for(i=1;i<5;i++){
        ic.push(reci.split('?')[1].split('&')[i]);
      }

    var ia = [];
    for(i=5;i<(cp+5);i++){
        ia.push(reci.split('?')[1].split('&')[i]);
      }
    var id = [];
    for(i=(cp+5);i<(cp+cp+4);i++){
        id.push(reci.split('?')[1].split('&')[i]);
      }

    var ias = [];
    for(i=0;i<cp;i++){
        ias.push(cts(ia[i]));
      }}
    else{
      var ic = [];
      for(i=4;i>0;i--){
          ic.push(reci.split('?')[1].split('&')[i]);
        }

      var ia = [];
      for(i=cp+4;i>4;i--){
          ia.push(reci.split('?')[1].split('&')[i]);
        }
      var id = [];
      for(i=(cp+cp+3);i>(cp+4);i--){
          id.push(reci.split('?')[1].split('&')[i]);
        }

      var ias = [];
      for(i=0;i<cp;i++){
          ias.push(cts(ia[i]));
        }
    }
  //var ad1 = (cpaz(ic[0],ic[1])+(ias.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0))*delta_angle+180*3600*cp);
  //while(ad1>=360*3600){
      //ad1 -= 360*3600;
    //}
  //while(ad1<0){
        //ad1 += 360*3600;
    //}
  //if(360*3600-Math.abs(cpaz(ic[2],ic[3])-ad1) < Math.abs(cpaz(ic[2],ic[3])-ad1)){
    //if(cpaz(ic[2],ic[3])>ad1){
      //var ad = (360*3600-Math.abs(cpaz(ic[2],ic[3])-ad1))*(-1);
    //}
    //else{
      //var ad = 360*3600-Math.abs(cpaz(ic[2],ic[3])-ad1);
    //}
  //}
  //else{
    //var ad = parseInt(cpaz(ic[2],ic[3])-ad1);
  //}

  //var adjust = [];
  //for(i=0;i<(cp-Math.abs(ad)%cp);i++){

      //adjust.push(parseInt(ad/cp));


  //}

  //for(i=0;i<(Math.abs(ad)%cp);i++){
      //if(ad < 0){
          //adjust.push(parseInt(ad/cp)-1);
        //}
    //  else{
          //adjust.push(parseInt(ad/cp)+1);
        //}
        //}
  //shuffle(adjust);
  //adjust.push(adjust.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0));
  //var aaa = [];
  //for(i=0;i<cp;i++){
      //aaa.push(ctn(cts(ia[i])+adjust[i]));
    //}
  var azl = [];
  azl.push(ctn(parseInt((cpaz(ic[0],ic[1])).toFixed(0))));
  for(i=0;i<cp;i++){
    if(delta_angle==1){
        if(cts(azl[i])+cts(ia[i])+180*3600 >= 720*3600){
            azl.push(ctn(cts(azl[i])+cts(ia[i])+180*3600-720*3600));
          }
        else if(cts(azl[i])+cts(ia[i])+180*3600 >= 360*3600){
            azl.push(ctn(cts(azl[i])+cts(ia[i])+180*3600-360*3600));
          }
        else{
            azl.push(ctn(cts(azl[i])+cts(ia[i])+180*3600));
          }
        }
      else{
        if(cts(azl[i])+cts(ia[i])*delta_angle-180*3600 <(-360*3600)){
            azl.push(ctn(cts(azl[i])+cts(ia[i])*delta_angle-180*3600+720*3600));
          }
        else if(cts(azl[i])+cts(ia[i])*delta_angle-180*3600 < 0){
            azl.push(ctn(cts(azl[i])+cts(ia[i])*delta_angle-180*3600+360*3600));
          }
        else{
            azl.push(ctn(cts(azl[i])+cts(ia[i])*delta_angle-180*3600));
          }
      }
          }
  var xl = [];
  for(i=0;i<(cp-1);i++){
      xl.push(Math.sin((cts(azl[i+1])/3600)*2*Math.PI/360)*id[i]);
    }
  var yl = [];
  for(i=0;i<(cp-1);i++){
      yl.push(Math.cos((cts(azl[i+1])/3600)*2*Math.PI/360)*id[i]);
  }
  //var xd = (parseFloat(ic[2].split('_')[0])-parseFloat(ic[1].split('_')[0]))-(xl.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0));
  //var yd = (parseFloat(ic[2].split('_')[1])-parseFloat(ic[1].split('_')[1]))-(yl.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0));
  //var acc = (xd**2+yd**2)**(1/2)/id.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0);
  //var acct = '1/'+parseInt((id.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0)/(xd**2+yd**2)**(1/2)).toFixed(0)).toString();
  //var xadj = [];
  //for(i=0;i<(cp-1);i++){
      //xadj.push((xd*id[i]/id.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0))+xl[i]);
    //}
  //var yadj = [];
  //for(i=0;i<(cp-1);i++){
      //yadj.push((yd*id[i]/id.reduce(function tmpsum(pre,now){return Number(pre)+Number(now)},0))+yl[i]);
      //}
  var rc = [];
  rc.push(ic[1]);
  for(i=0;i<(cp-1);i++){
          rc.push(((parseFloat(rc[rc.length-1].split('_')[0])+xl[i]).toFixed(3)) +"_" + ((parseFloat(rc[rc.length-1].split('_')[1])+yl[i]).toFixed(3) ));
        }
  rcx = rc.map(function(item, index, array){return item.split('_')[0]});
  rcy = rc.map(function(item, index, array){return item.split('_')[1]});
  return [rcx,rcy];


}
