const Project = require('../models/projectSchema');
const mongoose = require('mongoose');

module.exports = {
    putProjectAddListItem: (req, res, next) => {
        //takes project ID
        Project.findById({ _id: req.params.id }, (err, project) => {
            if (err) {
                res.status(500).json({ "status": "Error" });
                throw err;
            } else if (!project) {
                res.status(404).json({ "status": "not found" });
                throw err;
            }
            project.listItem.push(req.body.listItem);
            // project.save(function (err) {
            //     if (err) throw err
            //     res.status(200).json({ "status": "success" });
            // });
            project.save().then((newProject)=>{
                res.status(200).json(newProject);
            })
            .catch(next);
        });

    },
    putEditList: (req, res, next) => {


        Project.findById(req.params.id)
            .then((project) => {
                let listItem = project.listItem.id(req.body.listItem._id);
                listItem.set(req.body.listItem);

                project.save().then((newProject) => {
                    res.send(newProject);
                })
                    .catch(next)
            })
            .catch(next)
    },
    deleteList: (req, res, next) => {
        Project.findById(req.params.id)
            .then((project) => {
                let listItem = project.listItem.id(req.body.listItem._id).remove();

                project.save().then((newProject) => {
                    res.send(newProject);
                })
                    .catch(next)
            })
            .catch(next)

    }
}