const SQLdb = require("../config/SQLConfig")
const { query } = require("express")

const getUsers = async (req, res) => {
    await SQLdb.query('SELECT * FROM `useraccounts` ', async function (error, results, fields){
        if(results.length > 0){
            res.send(results)
        }else{
            res.status(404).send('No Users Found')
        }
    })
}

module.exports =  getUsers