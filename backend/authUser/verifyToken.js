const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = 
     (req, res, next) => {
         //grab token from bearer head
        let bearerHead = req.headers.authorization;
        //split bearer head into token and title
        bearerHead = bearerHead.split(' ')
        //grab token from array 
        token = bearerHead[1];
        console.log(token)
        if (!token) {
            console.log("no token")
            return res.status(403).json({ "auth": false, "message": "no token provided" });
        } else {
            console.log("got this far");
            jwt.verify(token, config.secret, (err, decoded) => {
                console.log(">>>>>>>>>>>>>>>>")
                if (err) {
                    console.log(err);
                    return res.status(500).json({ "auth": false, "message": "failed to authenticate token" });
                } else {
                    console.log(decoded)
                }
                req.userID = decoded.userID;
                next();
            });
        }
    }