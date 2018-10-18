let fs = require('fs');
let path = require('path');
let express =require('express');
let app = express();
let routes = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let database =require('./database');
database._connect();

routes(app)
console.log("working")
// app.use('/authUser', authUser);

app.use((err,req,res,next)=> {
    res.status(422).send({error:err.message});
});

app.listen(4000)
