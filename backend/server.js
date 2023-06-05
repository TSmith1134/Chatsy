const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const dotenv = require('dotenv')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

dotenv.config({ path: './.env'})
app.use(cors())

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
    const confirmPassword = req.body.confirmPassword

    db.query('SELECT * FROM `useraccounts` WHERE `username` = ?', [username], function (error, results, fields) {
        console.log(results[0].id)
        console.log(error)
        console.log(fields)

        if(results.length == 1){
            res.send('successful')
        }
      });
})