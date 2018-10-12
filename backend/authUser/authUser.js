const config = require ("./config");
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');

module.exports = {
    AuthenticateUser: (user) => {
        var token = jwt.sign({user}, config.secret, {
            expiresIn:86400
        });
        return token;
    }
}