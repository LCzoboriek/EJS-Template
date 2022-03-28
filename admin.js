const client = require('./db')
const user = require('./user.js');
const myTest = require('./restController')

function adminLogin(req, res){
    let tableName = 'test_table';
    let isAdmin = myTest.myUser.isadmin;
    if(isAdmin === 'Y'){
    let displayQuery = `SELECT * FROM ${tableName}`;
        client.query(displayQuery,
            (error, result) => {
                if(error){
                    console.log(error);
                    res.status(500).send(error);
                } else {
                    let data = result.rows;
                    console.table(data);
                    res.render('admin', {data});
                }
            })
    } else {
        res.render('welcome', {firstname: myTest.myUser.getfirstname, lastname: myTest.myUser.getlastname, message: 'You are not an admin'})
    }
}

function makeAdmin(params, req, res){
    let id = params.hiddenAdminId;
    let tableName = 'test_table'
    let myQuery = `UPDATE ${tableName} SET isadmin = 'Y' WHERE id = ${id}`;
    client.query(myQuery,
        (error, result) => {
            if(error){
                console.log(error);
                res.status(500).send(error);
            } else {
                adminLogin(req, res);
            }
        })
}

function demoteAdmin(params, req, res){
    let id = params.hiddenRemoveAdminId;
    let tableName = 'test_table'
    let myQuery = `UPDATE ${tableName} SET isadmin = 'N' WHERE id = ${id}`;
    client.query(myQuery,
        (error, result) => {
            if(error){
                console.log(error);
                res.status(500).send(error);
            } else {
                adminLogin(req, res);
            }
        })
}

function deleteUser(params, req, res){
    let id = params.hiddenId;
    let tableName = 'test_table'
    let myQuery = `DELETE FROM ${tableName} WHERE id = ${id}`;
    client.query(myQuery,
        (error, result) => {
            if(error){
                console.log(error);
                res.status(500).send(error);
            } else {
                adminLogin(req, res);
            }
        })
}

module.exports = {
    adminLogin, makeAdmin, demoteAdmin, deleteUser
}