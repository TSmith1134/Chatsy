const SQLdb = require("../config/SQLConfig")
const jwt = require('jsonwebtoken')

const handleLogout = async (req, res) => {
    const cookies = req.cookies

    if(!cookies?.jwt){
        return res.sendStatus(204)
    }

    const refreshToken = cookies.jwt

    await SQLdb.query('SELECT * FROM useraccounts WHERE refreshToken = ?', [refreshToken], async (err, results) => {
        if(err) return res.send(err)
        if(results.length < 1){
            res.clearCookie('jwt', {httpOnly : true, sameSite : 'none', secure : true})
            return res.sendStatus(204)
        }

        await SQLdb.query('UPDATE useraccounts SET refreshToken = Null WHERE id = ?' , [, results[0].id], (err) =>{
            if(err) return res.send(err)
        })
        res.clearCookie('jwt', {httpOnly : true, sameSite : 'none', secure : true})

        res.sendStatus(204)
    })
}

module.exports = handleLogout