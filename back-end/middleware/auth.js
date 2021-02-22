require('dotenv').config()
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET

module.exports = function(req, res, next){
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        const bearer = authToken.split(' ')
        const token = bearer[1]

        try{
            const decoded = jwt.verify(token, secret)
            if(decoded.role == 1){
                console.log(decoded)
                next()
            } else {
                res.send("You arent a Administrator!!!")
            }
        } catch(error){
            res.status(403)
            res.send("You are not authenticated")
        }
    } else {
        res.status(403)
        res.send("You are not authenticated")
    }
}