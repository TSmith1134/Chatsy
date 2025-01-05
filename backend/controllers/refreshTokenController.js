const SQLdb = require("../config/SQLConfig")
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config({ path: './config/.env'})

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies

    if(!cookies?.jwt){
        return res.sendStatus(401)
    }

    const refreshToken = cookies.jwt

    SQLdb.query('SELECT * FROM useraccounts WHERE refreshToken = ?', [refreshToken], (err, results) => {
        if(err) return res.send(err)
        if(results.length < 1) return res.sendStatus(403)
        if(results.length > 1) return res.sendStatus(403)

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, data) => {
                if(err || results[0].id !== data.userInfo.userID) return res.sendStatus(403)
                const username = results[0].username
                const roles = [results[0].role]
                const accessToken =  jwt.sign(
                    {'userInfo' : {
                        'id' : data.userInfo.userID,
                        'roles' : roles
                    }},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn : '20m'}
                )
    
                res.json({username, roles, accessToken})
            }
        )
    })
}
      

module.exports = handleRefreshToken