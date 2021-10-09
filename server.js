const express = require("express");
const fs = require('fs');
const app = express();
const url = require('url')
app.use(express.static('public'));
app.get("/",function(req,res){
  res.sendFile(__dirname+'/index.html');
})

app.get("/admin",function(req,res){
  var pw = url.parse(req.url,true).search;
  if(pw!='?107207426'){
    res.send('<h1 style="color: red;">Permission denied</h1>');

  }else{
  var senddata='<h1 style="color: green;">Logged in</h1>';
  fs.readFile('adminlog.txt', function (err, data) {
      if (err) throw err;
      for(i=0;i<(data.toString().split('@').length);i++){
        senddata=senddata+('<p>'+ data.toString().split('@')[i] + '</p>');
      }
      res.send(senddata);



  });
}
})


app.get("/result1",function(req,res){
  var log = url.parse(req.url,true).search;
  var dt = new Date();
  fs.appendFile(__dirname + '/adminlog.txt', dt+log+'@', function (err) {
      if (err)
          console.log(err);
      else
          console.log('Append operation complete.');
  });
  res.redirect('/result.html'+log)
})


app.get("/result2",function(req,res){
  var log = url.parse(req.url,true).search;
  var dt = new Date();
  fs.appendFile(__dirname + '/adminlog.txt', dt+log+'@', function (err) {
      if (err)
          console.log(err);
      else
          console.log('Append operation complete.');
  });
  res.redirect('/open_traverse.html'+log)
})

let port = process.env.PORT;
if(port == null || port==""){
  port = 3000;
}
app.listen(port, function(){console.log('Server Started.')});
