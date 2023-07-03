//setup dependancies
const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const dotenv = require('dotenv')
const axios = require('axios')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const crypto = require('crypto');
const bcrypt = require("bcrypt")

//important variables
const COOKIE_SECRET = 'dashldhe128ewhgcvasdy7et2hvhwytt2'
const SESSIONS = {}

//establish express app and dependancies
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

//establish database connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

//connect to database
db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})

//make express listen on port 3000
app.listen(3000, () => {
  console.log("app listening on port 3000")
})

//user login request
app.post('/login', (req, res)=>{
    //create username and password variables
    const username = req.body.username.toUpperCase()
    const password = req.body.password

    //get user  from database
    db.query('SELECT * FROM `useraccounts` WHERE `username` = ?', [username], function (error, results, fields) {
        if(results.length == 1){
            //user exists, check password
            bcrypt.compare(password, results[0].password, function(err, result) {
                if (result) {
                    // password is valid
                    //create session  cookie
                    const nextSessionId = crypto.randomBytes(12).toString('base64')
                    res.cookie('sessionId', nextSessionId, {maxAge:36000000 })
                    SESSIONS[nextSessionId] = results[0].id
                    //send response to client
                    res.send('successful')
                }
                else{
                    //password incorrect
                    res.send('Username or password is incorrect')
                }
            })
        }
        //too  many users exist
        else if(results.length > 1){
            res.send('unknown error occured')
        }
        //user does not exist
        else if(results.length < 1){
            res.send('Username or password is incorrect')
        }
        //sql error
        else{
            res.send(error)
        }
    })
})

//registeruser request
app.post('/register', (req,res)=>{
    //create variables
    const username = req.body.username.toUpperCase()
    var userId = ""
    var userError = false

    //encrypt password and add user to database
    bcrypt.genSalt(10, (err, salt) => {
        // use salt to hash password
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            //password encrypted

            //get all users from  database
            db.query('SELECT id, username FROM `useraccounts`', function (error, results, fields) {
                //if  there are users check username and create unique id 
                if(results.length > 0){
                    //check all usernames to see if username already exists
                    results.every(user => {
                        if(user.username.toUpperCase() === username.toUpperCase()){
                            //username exists
                            res.send("Username already exists")
                            userError = true
                            return false
                        }
                        //stop checking usernames if it already exists
                        return true
                    })

                    //create unique random hash id
                    let i = 0
                    while(i<1){
                        //create initial id
                        userId = crypto.randomBytes(24).toString('base64')
                        //check all ids to see if id exists
                        results.every(user => {
                            if(user.id === userId){
                                //if id exists skip following code and return to top
                                return false
                            }
                            //id does not exist, exit loop
                            i++
                            return
                        });
                    }
                }
                //no users exist, create random id and add user to database
                else{
                    //create id
                    userId = crypto.randomBytes(24).toString('base64')
                }

                //add user to database if no errors exist
                if(!userError){
                    
                    //insert into database
                    db.query('INSERT INTO `useraccounts` (id, username, password) VALUES (?, ?, ?)', [userId, username, hash], function (error, results, fields) {
                        if(error === null){
                            //send response to client
                            res.send('successful')
                        }
                    })
                }
            })
        })
    })
})