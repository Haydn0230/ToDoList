const Project = require('../models/projectSchema');
const mongoose = require('mongoose');

module.exports = {
    getUsersProject: (req,res,next) => {
        Project.find({"userAccess.userId":req.params.id})
            .then((project) =>{
                res.status(200).send(project);
            })
            .catch(next)
    },
    putAddProUser: (req, res, next) => {
        //find the project by the project ID
        Project.findById({_id:req.params.id}, (err, project) => {
            if (err) {
                res.status(500).json({"status":"Error"});
                throw err;
            } else if (!project) {
                res.status(404).json({"status":"not found"});
                throw err;
            }
            //add the json body that contains userAccess onto project.user
            project.userAccess.push(req.body.userAccess);
            
            project.save(function(err){
                if (err) throw err
                //send new project with added user back
                res.status(200).json({project});
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