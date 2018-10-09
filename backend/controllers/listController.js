const List = require('../models/listSchema');
const mongoose = require('mongoose');

module.exports = {
    getList: (req, res, next) => {
        List.findById({ _id: req.params.id })
            .then((list) => {
                res.send(list);
            })
            .catch(next);
    },
    addList: (req, res, next) => {
        List.create(req.body)
            .then((list) => {
                res.send(list);
            })
            .catch(next);

    },
    putList: (req, res, next) => {
        List.findByIdAndUpdate({ _id: req.params.id }, req.body)
            .then(() => {
                res.json({ "status": "200" });
            }).catch(next);
    },
    deleteList: (req, res, next) => {
        List.findByIdAndRemove({ _id: req.params.id })
            .then((list) => {
                res.send(list);
            }).catch(next);

    }
}