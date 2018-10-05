let express = require('express');
let router = express.Router();
let myControllersList = require('../controllers/controllers.js');
let myControllersUser =require('../controllers/userControllers.js')


router =(app) => {
    app.route('/user')
    .post((req,res,next) =>myControllersUser.addUser(req,res,next));
    
    app.route('/user/:id')
    .get((req,res,next) => myControllersUser.getUser(req,res,next))
    .put((req,res,next)=> myControllersUser.putUser(req,res,next))
    .delete((req,res,next) => myControllersUser.deleteUser(req,res,next));
}


module.exports = router;