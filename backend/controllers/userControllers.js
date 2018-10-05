let User = require('../models/userSchema');
let mongoose = require('mongoose');
module.exports = {
    getUser: (req,res,next) =>{
        User.findById({_id:req.params.id})
        .then((user)=>{     
            res.send(user);
        })
        .catch(next);
    },
    addUser: (req,res,next) => {
        User.create(req.body)
        .then((user)=>{
           res.send(user);
         })
        .catch(next);
    },
    putUser:(req,res,next) => {
        User.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(()=>{
            User.findOne({_id:req.params.id}).then((user)=>{
                res.send(user);
            });
        }).catch(next);
    },
    deleteUser: (req,res,next) => {
        User.findByIdAndRemove({_id:req.params.id})
        .then((user) => {
            res.send(user);
        }).catch(next);
        
    }
}