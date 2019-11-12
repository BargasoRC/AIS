var express = require('express');
var router = express.Router();
var app = express();
var port = 8080;
var path = require('path');
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var retrieve = require('./retrieve');
var check = require('./check');
var add = require('./addVisitor');

require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

app.all('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/checking', function (req, res) {
    check(req.query,res)
})

app.post('/add',function(req,res){
    add(req.body.student,req.body.visitor,res)
})

app.get('/retrieve/:student', (req, res) => {
    retrieve(req.body.student, res);
});

http.listen(port, function () {
    console.log('listening to port: ' + port);
});