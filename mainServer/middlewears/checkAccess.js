const jwt = require("jsonwebtoken")
const env = require("../config/env.json")

function checkAccess(req, res, next){
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).send({"message": "You must login first"})
    }
    jwt.verify(token, env.token, (err, user) => {
        if(err){
            return res.status(500).send({"message": "You must login first"})
        }
        req.user = user
        next()
    })
}

module.exports = {checkAccess}