const crypto = require('crypto')
const bcrypt = require("bcrypt")
const mysql = require("mysql")
const dotenv = require('dotenv')

//database config
dotenv.config({ path: './config/.env'})

//establish database connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const  handleNewUser = async (req, res) => {
    const { username, password } = req.body

    if(!username || !password){
        return res.status(400).json({'message' : 'Missing username or password'})
    }

    await db.query('SELECT * FROM useraccounts WHERE username = ?', [username], async function (error, results, fields){
        if(results.length > 0){
            return res.status(409).json({'message' : 'Username invalid: User already exists'})
        }

        try{
            const hashedPassword = await bcrypt.hash(password, 10)
            var userId = ''

            //get all users from  database
            await db.query('SELECT id FROM `useraccounts`', async function (error, results, fields) {
                //if  there are users check username and create unique id 
                if(results.length > 0){
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
                    
                //insert into database
                await db.query('INSERT INTO useraccounts (id, username, password) VALUES (?, ?, ?)', [userId, username, hashedPassword], function (error, results, fields) {
                    if(error === null){
                        //send response to client
                        res.status(201).send('User created')
                    }
                })
            })
        } catch(err) {
            res.status(500).json({'message' : err.message})
        }
    })

}

module.exports =  handleNewUser