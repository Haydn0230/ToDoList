const Project = require('../models/projectSchema');
const mongoose = require('mongoose');

module.exports = {
    // getList: (req, res, next) => {
    //     List.findById({ _id: req.params.id })
    //         .then((list) => {
    //             res.send(list);
    //         })
    //         .catch(next);
    // },
    putProjectAddListItem: (req, res, next) => {
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

    }
    // putList: (req, res, next) => {
    //     List.findByIdAndUpdate({ _id: req.params.id }, req.body)
    //         .then(() => {
    //             res.json({ "status": "200" });
    //         }).catch(next);
    // },
    // deleteList: (req, res, next) => {
    //     List.findByIdAndRemove({ _id: req.params.id })
    //         .then((list) => {
    //             res.send(list);
    //         }).catch(next);

    // }
}