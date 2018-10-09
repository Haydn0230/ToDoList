let express = require('express');
let router = express.Router();
let myControllersProject = require('../controllers/projectController.js');
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
    app.route('/addProject')
    .post((req,res,next)=>myControllersProject.addProject(req,res,next));

    app.route('/project/:id')
    .get((req,res,next) =>myControllerProject.getProject(req,res,next))
    .put((req,res,next)=>myControllersProject.putProject(req,res,next))
    .delete((req,res,next) =>myControllersProject.deleteProject(req,res,next));

    app.route('/addList/:id')
    
}


module.exports = router;