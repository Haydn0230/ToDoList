let User = require('../models/userSchema');
let mongoose = require('mongoose');
module.exports = {
    addUser: (req,res,next) => {
        User.create(req.body)
        .then((user)=>{
           res.send(user);
         })
        .catch(next);
    },

    // findUser:(req,res) =>{
    //     User.find({})
    //         .then((data) =>{
    //             console.log(data);
    //         })
    //         .catch((err)=>{
    //             console.log(err);
    //         });
        
    // }
}