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
    getUserByEmail: (req, res, next) => {
        User.findOne({ email: req.body.email })
            .then((user) => {

                res.status(200).json({
                    'email':user.email,
                    'userId':user._id,
                    'firstName':user.firstName,
                    'lastName':user.lastName
                });
            })
            .catch(next);
    },
    addUser: (req, res, next) => {
        User.create(req.body)
            .then((user) => {
                user.password = 0;
                var token = AuthUser.AuthenticateUser(user);
                res.status(200).json({ "auth": "true", "token": token, 'user':user });
            })
            .catch(next);

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
                        user.password = '';
                        let token = AuthUser.AuthenticateUser(user);
                        res.status(200).json({ "auth": true, "token": token, "user": user });
                        //res.status(200).json({ "auth": true, "token": token, "userId": user._id });
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
            .then((user) => {
                res.status(200).json({ "user": user });
            }).catch(next);
    },
    deleteUser: (req, res, next) => {
        User.findByIdAndRemove({ _id: req.params.id })
            .then((user) => {
                res.send(user);
            }).catch(next);

    }
}
