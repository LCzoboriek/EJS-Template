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
const adminPage = require('./admin');

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
    editProfile.processEditProfile(req, res)
})

app.post('/editprofile', (req, res) => {
    editProfile.changePassword(req.body, res)    
})

app.post('/register', (req, res) => {
    res.render('registration', {message: ''})
})

app.post('/login', (req, res, next) => {
    restController.checkUsername(req.body, res);
})

app.get('/admin', (req, res) => {
    adminPage.adminLogin(req, res)
})

app.post('/makeadmin', (req, res) => {
    adminPage.makeAdmin(req.body, req, res);//req.body cause we are taking parameters in
})

app.post('/removeadmin', (req, res) => {
    adminPage.demoteAdmin(req.body, req, res);//req.body cause we are taking parameters in
})

app.post('/deleteuser', (req, res) => {
    adminPage.deleteUser(req.body, req, res)
})

app.post('/registration', (req, res, next) =>{
    registration.processRegistration(req.body, res);
})

app.listen(4000, () => {
    console.log('Listening on port 4000');
});










