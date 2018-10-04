let express = require('express');
let router = express.Router();
let myControllersList = require('../controllers/controllers.js');
let myControllersUser =require('../controllers/userControllers.js')


router =(app) => {
    app.route('/user')
    .get((req,res)=>myControllersUser.findUser(req,res))
    .post((req,res,next) =>myControllersUser.addUser(req,res,next))
}

module.exports = router;