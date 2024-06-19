const mysql = require("mysql")
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

//database config
dotenv.config({ path: './config/.env'})

//establish database connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const handleLogout = async (req, res) => {
    const cookies = req.cookies

    if(!cookies?.jwt){
        return res.sendStatus(204)
    }

    const refreshToken = cookies.jwt

    await db.query('SELECT * FROM useraccounts WHERE refreshToken = ?', [refreshToken], async (err, results) => {
        if(err) return res.send(err)
        if(results.length < 1){
            res.clearCookie('jwt', {httpOnly : true, sameSite : 'none', secure : true})
            return res.sendStatus(204)
        }

        await db.query('UPDATE useraccounts SET refreshToken = Null WHERE id = ?' , [, results[0].id], (err) =>{
            if(err) return res.send(err)
        })
        res.clearCookie('jwt', {httpOnly : true, sameSite : 'none', secure : true})

        res.sendStatus(204)
    })
}

module.exports = handleLogout