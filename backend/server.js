const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const dotenv = require('dotenv')
const axios = require('axios')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const crypto = require('crypto');

const COOKIE_SECRET = 'dashldhe128ewhgcvasdy7et2hvhwytt2'
const SESSIONS = {}

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(COOKIE_SECRET))

const corsOptions ={
    origin:'http://localhost:3001', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

dotenv.config({ path: './.env'})

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})

app.listen(3000, () => {
  console.log("app listening on port 3000")
})

app.post('/login', (req, res)=>{
    const username = req.body.username
    const password = req.body.password

    db.query('SELECT * FROM `useraccounts` WHERE `username` = ?', [username], function (error, results, fields) {
        if(results.length == 1){
            if(results[0].password === password){
                const nextSessionId = crypto.randomBytes(12).toString('base64')
                res.cookie('sessionId', nextSessionId, {maxAge:36000000 })
                SESSIONS[nextSessionId] = results[0].id
                res.send('successful')
            }
            else{
                res.send('Username or password is incorrect')
            }
        }
        else if(results.length > 1){
            res.send('unknown error occured')
        }
        else if(results.length < 1){
            res.send('Username or password is incorrect')
        }
        else{
            res.send(error)
        }
      })
})

app.post('/register', (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    var userId = ""

    db.query('SELECT id FROM `useraccounts`', function (error, results, fields) {
        if(results.length > 0){
            let i = 0
            while(i<1){
                userId = crypto.randomBytes(24).toString('base64')
                results.forEach(id => {
                    if(id.id === userId){
                        return
                    }
                    i++
                });
            }
        }
        else{
            userId = crypto.randomBytes(24).toString('base64')
        }
        db.query('SELECT id, username FROM `useraccounts`', function (error, results, fields) {
        if(results.length > 0){
            let i = 0
            while(i<1){
                userId = crypto.randomBytes(24).toString('base64')
                results.forEach(user => {
                    if(user.id === userId){
                        return
                    }
                    if(user.username === username){
                        res.send('Username already exists')
                        return
                    }
                    
                    i++
                });
            }
        }
        else{
            userId = crypto.randomBytes(24).toString('base64')
        }
        db.query('INSERT INTO `useraccounts` (id, username, password) VALUES (?, ?, ?)', [userId, username, password], function (error, results, fields) {
            if(error === null){
                res.send('successful')
            }
          })
      })
      })
      
})