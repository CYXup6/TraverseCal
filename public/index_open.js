function popup(){
  var num=prompt("請輸入導線點個數:");
  var r =  /^[0-9]*[1-9][0-9]*$/;
  while(num>20||num<=0||!r.test(num)){
    if(num === null){
      window.location.href='index.html';
      break;
    }
    num=prompt("請輸入介於1~20的導線點個數:");

  }
  for(i=1;i<=parseInt(num)-1;i++){
  document.write('<label>第'+i+'觀測點(觀測角/距離):</label>');
  document.write('<input class="userinput data" type="text" name="" value="">');
  document.write('<input class="userinput data" type="text" name="" value=""><br>');}
  document.write('<label>第'+i+'觀測點(觀測角):</label>');
  document.write('<input class="userinput data" type="text" name="" value="">');
return num
}
function usedata1(){
  var checkapply=confirm("確定要套用範例數據???\n(將取代左側輸入欄內容)");
if(checkapply=== false){
  return;
}
   var odata=[179922.565,2509521.609,179854.174,2509206.766,181365.691,2509311.279,181656.034,2509322.726
,'83-57-08',207.322
,'177-10-05',311.532
,'165-50-28',263.242
,'210-21-22',340.508
,'149-44-56',280.849
,'142-00-02',210.903
,'226-23-44'
];
for(i=0;i<21;i++){
  document.querySelectorAll(".data")[i].value = odata[i];

}
}
function usedata2(){
  var checkapply=confirm("確定要套用範例數據???\n(將取代左側輸入欄內容)");
if(checkapply=== false){
  return;
}
   var odata=[1000,1000,1202.18,1035.394,1795.683,1000.498,1973.433,1136.038
     ,'239-29-34',174.4225
     ,'122-57-26',218.1023
     ,'114-5-39',231.133
     ,'290-53-41',249.6563
     ,'105-9-56'];
for(i=0;i<17;i++){
  document.querySelectorAll(".data")[i].value = odata[i];

}
}
function usedata3(){
  var checkapply=confirm("確定要套用範例數據???\n(將取代左側輸入欄內容)");
if(checkapply=== false){
  return;
}
   var odata=[100,200,100,100,400,100,500,100
     ,'269-59-40',100.01
     ,'225-0-0',141.4
     ,'89-59-40',141.42
     ,'224-59-40'];
for(i=0;i<15;i++){
  document.querySelectorAll(".data")[i].value = odata[i];

}
}
function usedata4(){
  var checkapply=confirm("確定要套用範例數據???\n(將取代左側輸入欄內容)");
if(checkapply=== false){
  return;
}
   var odata=[500,600,500,500,500,500,500,600
     ,'125-30-0',105.22
     ,'107-48-30',80.18
     ,'73-0-20',129.34
     ,'89-33-50',78.16
     ,'324-6-30'];
for(i=0;i<17;i++){
  document.querySelectorAll(".data")[i].value = odata[i];

}
}

function trans(){
var re = /^\d{1,}-\d{1,}-\d{1,}$/;
var re1 = /^\d{1,}\.?\d{1,}$/;
var ilist=[];
for(i=0;i<8;i++){
  var inputformat=re1.test(document.querySelectorAll(".data")[i].value);
  if(!inputformat){
    var erralert=confirm("座標值輸入格式有誤");
    return;
  }
}
ilist.push(String(document.querySelectorAll(".data")[0].value)+"_"+String(document.querySelectorAll(".data")[1].value));
ilist.push(String(document.querySelectorAll(".data")[2].value)+"_"+String(document.querySelectorAll(".data")[3].value));
ilist.push(String(document.querySelectorAll(".data")[4].value)+"_"+String(document.querySelectorAll(".data")[5].value));
ilist.push(String(document.querySelectorAll(".data")[6].value)+"_"+String(document.querySelectorAll(".data")[7].value));
for(i=0;i<num;i++){
var inputformat = re.test(document.querySelectorAll(".data")[8+i*2].value);
if(!inputformat){
  var erralert=confirm("觀測角輸入格式有誤(第"+(i+1)+"觀測點)");
  return;
}
ilist.push(document.querySelectorAll(".data")[8+i*2].value);
}
for(i=0;i<parseInt(num)-1;i++){
var inputformat = re1.test(document.querySelectorAll(".data")[9+i*2].value);
if(!inputformat){
  var erralert=confirm("距離輸入格式有誤(第"+(i+1)+"觀測點)");
  return;
}
ilist.push(document.querySelectorAll(".data")[9+i*2].value);
}
var flist=num+'&';
for(i=0;i<num*2+3;i++){
  flist = flist + String(ilist[i]);
  flist+='&';
}
var btn2 = document.getElementsByClassName('adjustpara4')[0].style.borderStyle;
if(btn2==='inset'){
  var sp = 1;
}else{
  var sp = -1;
}
flist+="$";
flist+=String(sp);
window.location.href="/result2?" + flist;
}

function changenum(){
  window.location.href='index_open.html'
}
function ap1(){
document.getElementsByClassName('adjustpara4')[0].style.borderStyle = "inset";
document.getElementsByClassName('adjustpara5')[0].style.borderStyle = "outset";

}
function ap4(){
  document.getElementsByClassName('adjustpara4')[0].style.borderStyle = "inset";
  document.getElementsByClassName('adjustpara5')[0].style.borderStyle = "outset";
}
function ap5(){
  document.getElementsByClassName('adjustpara5')[0].style.borderStyle = "inset";
  document.getElementsByClassName('adjustpara4')[0].style.borderStyle = "outset";
}
