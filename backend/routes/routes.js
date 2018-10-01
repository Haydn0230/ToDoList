var express = require('express');
var router = express.Router();
var myControllers = require('../controllers/controllers.js');

router = (app) => {
    app.route('/todoall')
    // .get((req,res) => myControllers.viewSingle(app,req,res))
    .get((req,res)=>myControllers.viewAll(app,req,res))
    .post((req,res)=>myControllers.addListItem(app,req,res))
    .put((req, res)=>myControllers.editList(app,req,res))
    .delete((req,res)=>myControllers(app,req,res))
}

module.exports = router;