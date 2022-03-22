const express = require('express');
const app = express();
const client = require('./db.js');
const http = require('http');
const body_parser = require('body-parser');
const path = require('path');
const { table } = require('console');
const user = require('./user.js');
const { get } = require('express/lib/response');
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
    processEditProfile(req, res)
})

app.post('/register', (req, res) => {
    res.render('registration', {message: ''})
})

app.post('/login', (req, res, next) => {
    checkUsername(req.body, res);
})

function processEditProfile(params, res){
    res.render('editprofile', {username: myUser.getusername, password: myUser.getpassword})
}

function checkUsername(params, res) {
    let username = params.username;
    let userExists = false;
    let tableName = 'test_table';
    let columnName = 'user_name';
    let myQuery = `SELECT ${columnName} FROM "${tableName}"`;
    console.log(myQuery);
    client.query(myQuery, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            for(let i = 0; i < result.rows.length; i++){
                if (result.rows[i].user_name === username) {
                    userExists = true;
                    myUser.setusername = result.rows[i].user_name
                    validatePassword(params, res);
                    break;
                }
            }
            if (!userExists) {
                res.render('login', {message: 'Invalid username or password'})
            }
        }
    })
};

function validatePassword(params, res) {
    let userName = params.username;
    let password = params.password;
    console.log(userName + password);
    let tableName = 'test_table';
    let columnName = 'user_name';
    let myQuery = `SELECT password, first_name, id, isadmin, last_name FROM "${tableName}" WHERE ${columnName} = '${userName}'`;
    console.log(myQuery);
    client.query(myQuery, 
        (error, result) => {
            if(error){
                console.log(error);
            } else {
                let dbpassword = result.rows[0].password;
                if(dbpassword === password){
                    myUser.setid = result.rows[0].id;
                    myUser.setfirstname = result.rows[0].first_name;
                    myUser.setlastname = result.rows[0].last_name;
                    myUser.setisadmin = result.rows[0].isadmin;
                    myUser.setpassword = dbpassword;
                    console.table(myUser);
                    res.render('welcome', {username: myUser.getfirstname, lastname: myUser.getlastname});
                } else {
                    res.render('login',{message: 'Invalid username or password'});
                }
            } 
        })
}

app.post('/registration', (req, res, next) =>{
    processRegistration(req.body, res);
})

function processRegistration(params, res){
    let userName = params.username;
    let firstName = params.first_name;
    let lastName = params.last_name
    let password = params.password;
    let tableName = 'test_table';
    let myQuery = `INSERT INTO ${tableName}(
        first_name, last_name, password, user_name)
	VALUES ('${firstName}', '${lastName}', '${password}', '${userName}');`;
    console.log(myQuery);
    client.query(myQuery, (error, result) => {
        if(error){
            res.render('registration', {message: 'Username already exists!'})   
        } else {
            res.render('login',{message: "Account created succesfully"})
            }
        }
)}


app.get('/testdb', (req, res) => {
    getData(req,res);
})

app.listen(4000, () => {
    console.log('Listening on port 4000');
});

