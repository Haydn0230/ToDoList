var fs = require('fs');
var path = require('path');
var express =require('express');
var app = express();
var routes = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

routes(app)

var MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser:true}, function(err, client) {
    app.set('myDb', client.db('staffDb'));
})

app.listen(3000)
