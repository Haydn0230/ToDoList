const User = require('../models/userSchema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

module.exports = {
    getUser: (req, res, next) => {
        console.log(req.params.email)
        User.findById({ _id: req.params.id })
            .then((user) => {
                res.send(user);

            })
            .catch(next);
    },
    addUser: (req, res, next) => {
        //let hashPass = req.body.password;
        //bcrypt.hash(req.body.password, 10, (err, hash) => {
            //req.body.password = hash;
            User.create(req.body)
                .then((user) => {
                    res.send(user);
                })
                .catch(next);
        //});

    },
    postUser: (req, res, next) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                res.status(400).json({ "status": "User doesnt exist" })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, hashesMatch) => {
                    if (hashesMatch === true) {
                        res.status(200).json({ "status": "success" });
                    } else {
                        res.status(406).json({ "status": "failure" });
                    }
                })
            }
        })
    },
    putUser: (req, res, next) => {
        User.findByIdAndUpdate({ _id: req.params.id }, req.body)
            .then(() => {
                res.json({"status":"200"});
            }).catch(next);
    },
    deleteUser: (req, res, next) => {
        User.findByIdAndRemove({ _id: req.params.id })
            .then((user) => {
                res.send(user);
            }).catch(next);

    }
}