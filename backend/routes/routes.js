const express = require('express');
let router = express.Router();
const myControllersProject = require('../controllers/projectController.js');
const myControllersUser = require('../controllers/userControllers.js');
const myControllersList = require('../controllers/listControllers.js');


router = (app) => {
    // <<< Users >>>
    app.route('/addUser')
    .post((req,res,next) =>myControllersUser.addUser(req,res,next));

    app.route('/verify')
    .post((req,res,next)=> myControllersUser.postUser(req,res,next));
    

    app.route('/user/:id')
    .get((req,res,next) => myControllersUser.getUser(req,res,next))
    .put((req,res,next)=> myControllersUser.putUser(req,res,next))
    .delete((req,res,next) => myControllersUser.deleteUser(req,res,next));

    // <<< Project >>>
    app.route('/addProject')
    .post((req,res,next)=>myControllersProject.addProject(req,res,next));

    app.route('/project/:id')
    .get((req,res,next) =>myControllersProject.getProject(req,res,next))
    .put((req,res,next)=>myControllersProject.putProject(req,res,next))
    .delete((req,res,next) =>myControllersProject.deleteProject(req,res,next));
    
    // <<< List >>>
    app.route('/addList/:id')
    .put((req,res,next)=>myControllersList.putProjectAddListItem(req,res,next));
    
    app.route('/editList/:id')
    .put((req,res,next)=>myControllersList.putEditList(req,res,next))
    .delete((req,res,next) => myControllersList.deleteList(req,res,next));

    // <<< Project Users >>>
    app.route('/addProjectUser') 
    .put((req,res,next)=> myControllersProUser.addProUser(req,res,next));

}


module.exports = router;