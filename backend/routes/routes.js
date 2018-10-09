let express = require('express');
let router = express.Router();
let myControllersList = require('../controllers/controllers.js');
let myControllersUser =require('../controllers/userControllers.js')


router =(app) => {
    // <<< Users >>>
    app.route('/addUser')
    .post((req,res,next) =>myControllersUser.addUser(req,res,next));

    app.route('/verify')
    .post((req,res,next)=> myControllersUser.postUser(req,res,next));
    

    app.route('/user/:id')
    .get((req,res,next) => myControllersUser.getUser(req,res,next))
    .put((req,res,next)=> myControllersUser.putUser(req,res,next))
    .delete((req,res,next) => myControllersUser.deleteUser(req,res,next));

    // <<< List >>>
}


module.exports = router;