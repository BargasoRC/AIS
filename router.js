var express = require('express');
var app = express();
var port = 8080;
var path = require('path');
var http = require('http').Server(app);

app.use(express.static('public'));

app.all('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.all('/create',(req,res)=>{
    
})
// app.all('/enroll', function(req, res){
//     Enroll.enroll(req,res);
// });

// app.all('/class/:subject', function(req, res){
//     mod.csvtabular(req,res);
// });

http.listen(port, function(){
    console.log('listening to port: '+port);
});