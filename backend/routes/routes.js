var express = require('express');
var router = express.Router();
var myControllers = require('../controllers/controllers.js');

router = (app) => {
    app.route('/todo')
    .get((req,res) => {
      
    });
}

module.exports = router;