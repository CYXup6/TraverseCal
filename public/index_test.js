function popup(){
  var num=prompt("請輸入導線點個數:");
  var r =  /^[0-9]*[1-9][0-9]*$/;
  while(num>27||num<=0||!r.test(num)){
    if(num === null){
      window.location.href='index.html';
      break;
    }
    num=prompt("請輸入介於1~27的導線點個數:");

  }
  for(i=1;i<=num;i++){
  document.write('<label>第'+i+'觀測點(觀測角/距離):</label>');
  document.write('<input class="userinput data" type="text" name="" value="">');
  document.write('<input class="userinput data" type="text" name="" value=""><br>');}
return num
}
function numofpoint(){
  var a = document.getElementById('num').value;
  for(i=1;i<=a;i++){
  document.write('<label>第'+i+'觀測點(觀測角/距離):</label>');
  document.write('<input class="userinput" type="text" name="" value="">');
  document.write('<input class="userinput" type="text" name="" value=""><br>');}
}
function numofpoint1(){
  var a = document.getElementById('num').value;

      var add_input1=document.getElementById("first_1");
      var add_input2=document.getElementById("first_2");
      var add_input3=document.getElementById("first_3");
      var nodefather = add_input1.parentNode;
      var clone1 = add_input1.cloneNode();
      var clone2 = add_input2.cloneNode();
      var clone3 = add_input3.cloneNode();
      clone1.removeAttribute("id");
      clone2.removeAttribute("id");
      clone3.removeAttribute("id");
      for(i=1;i<a;i++){
      clone1.innerHTML = '第'+ (i+1) + '觀測點(觀測角/距離):';
      nodefather.appendChild(clone1);
      nodefather.appendChild(clone2);
      nodefather.appendChild(clone3);
  }

}
function usedata1(){
  var checkapply=confirm("確定要套用範例數據???\n(將取代左側輸入欄內容)");
if(checkapply=== false){
  return;
}
   var odata=[308266.452,2764391.61,308241.538,2764367.912,'101-18-40',34.364,'164-25-2',70.485,'116-57-2',34.884,'165-36-40',34.333,'165-1-10',37.039
,'136-21-52',34.375
,'200-35-3',56.52
,'178-29-9',54.125
,'196-37-7',35.808
,'62-45-31',58.143
,'125-40-35',61.041
,'171-58-34',51.234
,'196-20-26',63.128
,'177-53-59',41.049,'238-13-41'
];
for(i=0;i<33;i++){
  document.querySelectorAll(".data")[i].value = odata[i];

}
}
function usedata2(){
  var checkapply=confirm("確定要套用範例數據???\n(將取代左側輸入欄內容)");
if(checkapply=== false){
  return;
}
   var odata=[500,500,500,600,'89-36-30',105.22,'107-48-30',80.18,'73-0-20',129.34,'89-33-50',78.16,'35-53-30'];
for(i=0;i<13;i++){
  document.querySelectorAll(".data")[i].value = odata[i];

}
}
function usedata3(){
  var checkapply=confirm("確定要套用範例數據???\n(將取代左側輸入欄內容)");
if(checkapply=== false){
  return;
}
   var odata=[100,100,10,160,'98-25-41',186.698,'119-17-2',82.366,'68-7-36',244.33,'74-9-57',104.466,'42-52-59'];
for(i=0;i<13;i++){
  document.querySelectorAll(".data")[i].value = odata[i];

}
}
function usedata4(){
  var checkapply=confirm("確定要套用範例數據???\n(將取代左側輸入欄內容)");
if(checkapply=== false){
  return;
}
   var odata=[308156.134,2764405.982,308168.718,2764396.412,'171-31-5',77.989,'129-31-10',58.79,'125-21-50'
   ,55.228,'117-38-42',70.472,'206-37-38',111.645,'55-4-33',83.545,'157-5-50',36.554,'201-59-6',58.792,'95-10-29',52.836,'144-2-26'];
for(i=0;i<23;i++){
  document.querySelectorAll(".data")[i].value = odata[i];

}
}

function trans(){
var re = /^\d{1,}-\d{1,}-\d{1,}$/;
var re1 = /^\d{1,}\.?\d{1,}$/;
var ilist=[];
var inputformat = re.test(document.querySelectorAll(".data")[num*2+4].value);
if(!inputformat){
  var erralert=confirm("觀測角輸入格式有誤(最後一格)");
  return;
}
ilist.push(document.querySelectorAll(".data")[num*2+4].value);
for(i=0;i<4;i++){
  var inputformat = re1.test(document.querySelectorAll(".data")[i].value);
  if(!inputformat){
    var erralert=confirm("座標值輸入格式有誤");
    return;
  }
  ilist.push(document.querySelectorAll(".data")[i].value);
}

for(i=1;i<=num;i++){
var inputformat = re.test(document.querySelectorAll(".data")[i*2+2].value);
if(!inputformat){
  var erralert=confirm("觀測角輸入格式有誤(第"+i+"觀測點)");
  return;
}
ilist.push(document.querySelectorAll(".data")[i*2+2].value);
var inputformat = re1.test(document.querySelectorAll(".data")[i*2+3].value);
if(!inputformat){
  var erralert=confirm("距離輸入格式有誤(第"+i+"觀測點)");
  return;
}
ilist.push(document.querySelectorAll(".data")[i*2+3].value);
}
var flist=num+'&';
for(i=0;i<num*2+5;i++){
  flist = flist + String(ilist[i]);
  flist+='&';
}
var btn1 = document.getElementsByClassName('adjustpara2')[0].style.borderStyle;
var btn2 = document.getElementsByClassName('adjustpara4')[0].style.borderStyle;
var btn3 = document.getElementsByClassName('adjustpara6')[0].style.borderStyle;
if(btn1==='inset'){
  var fp = 1;
}else{
  var fp = -1;
}
flist+="$";
flist+=String(fp);
if(btn2==='inset'){
  var sp = 1;
}else{
  var sp = -1;
}
flist+="$";
flist+=String(sp);
if(btn3==='inset'){
  var tp = -360;
}else{
  var tp = 360;
}
flist+="$";
flist+=String(tp);
window.location.href="/result1?" + flist;

}

function changenum(){
  window.location.href='index_test.html'
}
function ap1(){
  document.getElementsByClassName('adjustpara2')[0].style.borderStyle = "inset";
  document.getElementsByClassName('adjustpara4')[0].style.borderStyle = "inset";
  document.getElementsByClassName('adjustpara6')[0].style.borderStyle = "inset";
  document.getElementsByClassName('adjustpara3')[0].style.borderStyle = "outset";
  document.getElementsByClassName('adjustpara5')[0].style.borderStyle = "outset";
  document.getElementsByClassName('adjustpara7')[0].style.borderStyle = "outset";
}
function ap2(){
  document.getElementsByClassName('adjustpara2')[0].style.borderStyle = "inset";
  document.getElementsByClassName('adjustpara3')[0].style.borderStyle = "outset";
}
function ap3(){
  document.getElementsByClassName('adjustpara3')[0].style.borderStyle = "inset";
  document.getElementsByClassName('adjustpara2')[0].style.borderStyle = "outset";
}
function ap4(){
  document.getElementsByClassName('adjustpara4')[0].style.borderStyle = "inset";
  document.getElementsByClassName('adjustpara5')[0].style.borderStyle = "outset";
}
function ap5(){
  document.getElementsByClassName('adjustpara5')[0].style.borderStyle = "inset";
  document.getElementsByClassName('adjustpara4')[0].style.borderStyle = "outset";
}
function ap6(){
  document.getElementsByClassName('adjustpara6')[0].style.borderStyle = "inset";
  document.getElementsByClassName('adjustpara7')[0].style.borderStyle = "outset";
}
function ap7(){
  document.getElementsByClassName('adjustpara7')[0].style.borderStyle = "inset";
  document.getElementsByClassName('adjustpara6')[0].style.borderStyle = "outset";
}
