const mysql = require("mysql")
const dotenv = require('dotenv')
const { query } = require("express")

//database config   
dotenv.config({ path: './config/.env'})

//establish database connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const getUsers = async (req, res) => {
    await db.query('SELECT * FROM `useraccounts` ', async function (error, results, fields){
        if(results.length > 0){
            res.send(results)
        }else{
            res.status(404).send('No Users Found')
        }
    })
}

module.exports =  getUsers