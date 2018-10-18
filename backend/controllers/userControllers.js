const User = require('../models/userSchema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AuthUser = require('../authUser/authUser');

module.exports = {
    getUser: (req, res, next) => {
        User.findById({ _id: req.params.id })
            .then((user) => {
                res.send(user);
            })
            .catch(next);
    },
    addUser: (req, res, next) => {
        User.create(req.body)
            .then((user) => {
                user.password = 0;
                var token = AuthUser.AuthenticateUser(user);
                res.status(200).json({ "auth": "true", "token": token });
            })
            .catch(next);

    },
    postUser: (req, res, next) => {
        console.log("called verify");
        User.findOne({ email: req.body.email }, (err, user) => {
            console.log(req.body);
            if (err) {
                throw err;
            }
            if (!user) {
                res.status(400).json({ "status": "User doesnt exist" })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, hashesMatch) => {
                    if (hashesMatch === true) {
                        user.password = '';
                        let token = AuthUser.AuthenticateUser(user);
                        res.status(200).json({ "auth": true, "token": token });
                        // window.localStorage.setItem("token", token)
                    } else {
                        res.status(401).json({ "status": "unauthorized" });
                    }
                })
            }
        })
    },
    putUser: (req, res, next) => {
        User.findByIdAndUpdate({ _id: req.params.id }, req.body)
            .then(() => {
                res.json({ "status": "200" });
            }).catch(next);
    },
    deleteUser: (req, res, next) => {
        User.findByIdAndRemove({ _id: req.params.id })
            .then((user) => {
                res.send(user);
            }).catch(next);

    }
}
