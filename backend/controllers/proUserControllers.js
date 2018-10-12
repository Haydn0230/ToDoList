const Project = require('../models/projectSchema');
const mongoose = require('mongoose');

module.exports = {
    putAddProUser: (req, res, next) => {
        console.log(">>>>>1");
        Project.findById({_id:req.params.id}, (err, project) => {
            if (err) {
                res.status(500).json({"status":"Error"});
                throw err;
            } else if (!project) {
                res.status(404).json({"status":"not found"});
                throw err;
            }

            project.userAccess.push(req.body.userAccess);
            project.save(function(err){
                if (err) throw err
                res.status(200).json({"status":"success"});
            });
        });

    },
    deleteProUser: (req, res, next) => {
         Project.findById(req.params.id)
        .then((project) => {

            let userAccess = project.userAccess.id(req.body.userAccess._id).remove();
            
            project.save().then((newUser)=> {
                res.send(newUser);
            })
            .catch(next)
        })
        .catch(next)

    }
}