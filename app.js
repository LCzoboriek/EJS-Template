const express = require('express');
const app = express();
const client = require('./db.js');
const http = require('http');
const body_parser = require('body-parser');
const path = require('path');
const { table } = require('console');
const user = require('./user.js');
const { get } = require('express/lib/response');
const res = require('express/lib/response');
const restController = require('./restController');
const registration = require('./registration');
const editProfile = require('./editprofile');

let myUser = new user;
app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());
app.set('views','views'); // Path to where my views are located
app.set('view engine','ejs'); // Using a view engine and what one you are using

app.get('/', (req, res) => {
    res.render('login', {message: ''})
})

app.get('/editprofile', (req, res)=>{
    editProfile.processEditProfile(req, res, myUser)
})

app.post('/register', (req, res) => {
    res.render('registration', {message: ''})
})

app.post('/login', (req, res, next) => {
    restController.checkUsername(req.body, res);
})

app.get('/admin', (req, res) => {
    adminLogin(req, res)
})

app.post('/makeadmin', (req, res) => {
    makeAdmin(req.body, req, res);//req.body cause we are taking parameters in
})

app.post('/removeadmin', (req, res) => {
    demoteAdmin(req.body, req, res);//req.body cause we are taking parameters in
})

app.post('/deleteuser', (req, res) => {
    deleteUser(req.body, req, res)
})

app.post('/registration', (req, res, next) =>{
    registration.processRegistration(req.body, res);
})

app.listen(4000, () => {
    console.log('Listening on port 4000');
});


function checkLoggedIn(){
    if(myUser.getid || myUser.getusername == ''){
        return false
    } else {
        return true
    }
}

function adminLogin(req, res){
    let tableName = 'test_table'
    let myQuery = `SELECT * FROM ${tableName}`
    client.query(myQuery,
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