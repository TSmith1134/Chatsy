const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const verifyJWT  = (req, res, next) => {
    const authHeader = req.headers.authorisation
    // console.log(authHeader)
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
    const token = authHeader.split(' ')[1]
    // console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, data) => {
            if(err) return res.sendStatus(403).send(err)
            req.user = data.userInfo.userID
            req.role = data.userInfo.userRole
            next()
        }
    )
}

module.exports = verifyJWT