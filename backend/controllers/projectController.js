const Project = require('../models/projectSchema');
const mongoose = require('mongoose');

module.exports = {
    getProject: (req, res, next) => {
        Project.findById({ _id: req.params.id })
            .then((project) => {
                res.send(project);
            })
            .catch(next);
    },
    addProject: (req, res, next) => {
        console.log(req.body);
        Project.create(req.body)
            .then((project) => {
                res.send(project);
            })
            .catch(next);

    },
    putProject:(req,res,next) =>{
        Project.findOneAndUpdate({_id:req.params.id},(req.body),{new:true}, (err, project) => {
            if (err) {
                throw err;
            }
            if (!project) {
                res.status(500).json({"status":"Not Found"})
            } else {
                res.send(project);
            }

        });
    },
    putProjectListItem: (req, res, next) => {
        Project.findById({_id:req.params.id}, (err, project) => {
            if (err) {
                res.status(500).json({"status":"Error"});
                next();
            } else if (!project) {
                res.status(404).json({"status":"not found"});
                next();
            }

            project.listItem.push(req.body.listItem);
            project.save(function(err){
                if (err) throw err
                res.status(200).json({"status":"success"});
            });
        });

    },
    deleteProject: (req, res, next) => {
        Project.findByIdAndRemove({ _id: req.params.id })
            .then((project) => {
                res.send(project);
            }).catch(next);

    }
}