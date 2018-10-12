const express = require('express');
let router = express.Router();
const myControllersProject = require('../controllers/projectController.js');
const myControllersUser = require('../controllers/userControllers.js');
const myControllersList = require('../controllers/listControllers.js');
const myControllersProUser = require('../controllers/proUserControllers.js');
const verify = require('../authUser/verifyToken');

router = (app) => {
    // <<< Users >>>
    app.route('/addUser')
    .post((req,res,next) =>myControllersUser.addUser(req,res,next));

    app.route('/verify')
    .post(verify, (req,res,next)=> myControllersUser.postUser(req,res,next));
    

    app.route('/user/:id')
    .get(verify,(req,res,next) => myControllersUser.getUser(req,res,next))
    .put(verify,(req,res,next)=> myControllersUser.putUser(req,res,next))
    .delete(verify,(req,res,next) => myControllersUser.deleteUser(req,res,next));

    // <<< Project >>>
    app.route('/addProject')
    .post(verify,(req,res,next)=>myControllersProject.addProject(req,res,next));

    app.route('/project/:id')
    .get(verify,(req,res,next) =>myControllersProject.getProject(req,res,next))
    .put(verify,(req,res,next)=>myControllersProject.putProject(req,res,next))
    .delete(verify,(req,res,next) =>myControllersProject.deleteProject(req,res,next));
    
    // <<< List >>>
    app.route('/addList/:id')
    .put(verify,(req,res,next)=>myControllersList.putProjectAddListItem(req,res,next));
    
    app.route('/editList/:id')
    .put(verify,(req,res,next)=>myControllersList.putEditList(req,res,next))
    .delete(verify,(req,res,next) => myControllersList.deleteList(req,res,next));

    // <<< Project Users >>>
    app.route('/addProjectUser/:id') 
    .put(verify,(req,res,next)=> myControllersProUser.putAddProUser(req,res,next));

    app.route('/projectUser/:id') 
    .delete(verify,(req,res,next)=> myControllersProUser.deleteProUser(req,res,next));

}
 

module.exports = router;