const bcrypt = require("bcrypt")
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { log } = require("console")
const SQLdb = require('../config/SQLConfig')

const handleLogin =  async (req, res) => {
    const { username, password } = req.body

    if(!username || !password){
        return res.status(400).json({'message' : 'Missing username or password'})
    }

    await SQLdb.query('SELECT * FROM `useraccounts` WHERE `username` = ?', [username], async function (error, results, fields) {
        if(results.length == 1){
            //user exists, check password
            await bcrypt.compare(password, results[0].password, async function(err, result) {
                if (result) {
                    // password is valid
                    //create web token
                    const accessToken =  jwt.sign(
                        {'userInfo' : {
                            'id' : results[0].id,
                            'role' : results[0].role
                        }},
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn : '20m'}
                    )
                    
                    const refreshToken = jwt.sign(
                        {'userInfo' :  {
                            'userID' : results[0].id,
                            'userRole' : results[0].role
                        }},
                        process.env.REFRESH_TOKEN_SECRET,
                        {expiresIn : '5d'})

                    await SQLdb.query('UPDATE useraccounts SET refreshToken = ? WHERE id = ?' , [refreshToken, results[0].id], (err) =>{
                        if(err) return res.send(err)
                    })
                    
                    const roles =  [results[0].role]
                    
                    //send response to client
                    res.cookie('jwt', refreshToken, {httpOnly : true, sameSite : 'none', secure : true, maxAge : 5 * 24 * 60 * 60 * 1000})
                    res.status(200).json({roles, accessToken})
                }
                else{
                    //password incorrect
                    res.status(401).json({'message' : 'Username or password is incorrect'})
                }
            })
        }
        //too  many users exist
        else if(results.length > 1){
            res.send('unknown error occured')
        }
        //user does not exist
        else if(results.length < 1){
            res.status(401).json({'message' : 'Username or password is incorrect'})
        }
        //sql error
        else{
            res.send(error)
        }
    })
}

module.exports = handleLogin