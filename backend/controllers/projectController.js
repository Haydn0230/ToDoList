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
    deleteProject: (req, res, next) => {
        Project.findByIdAndRemove({ _id: req.params.id })
            .then((project) => {
                res.status(200).json({"Status":"success"});
            }).catch(next);

    }
}