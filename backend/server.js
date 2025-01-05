//setup dependancies
const mysql = require("mysql")
const express = require("express")
const cors = require("cors")
const corsOptions = require('./config/corsOptions')
const axios = require('axios')
const cookieParser = require('cookie-parser')
const SQLdb = require('./config/SQLConfig')

const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const credentials = require("./middleware/credentials")

//important variables
const COOKIE_SECRET = 'dashldhe128ewhgcvasdy7et2hvhwytt2'

//establish express app and dependancies
const app = express()

//use request logger middleware
app.use(logger)

app.use(credentials)

//use cors
app.use(cors(corsOptions));

//express middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//cookieparser middleware
app.use(cookieParser(COOKIE_SECRET))

//routes
// app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

  //static file routes
app.use('/images', express.static('images'))

  //protected routes
app.use(verifyJWT)
app.use('/users', require('./routes/users'))

//errorhandler middleware
app.use(errorHandler)

//check connection to databases
SQLdb.ping((err) => { 
  if(err) console.log(err); 
  //make express listen on port 3000  
  else if(!err){
    app.listen(3000, () => {
    console.log("app listening on port 3000")
  })
  }
}) 

