const express = require('express');
const app = express();
const client = require('./db.js');
const http = require('http');
const body_parser = require('body-parser');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

app.set('views','views'); // Path to where my views are located
app.set('view engine','ejs'); // Using a view engine and what one you are using

app.get('/', (req, res) => {
    res.render('login', {message: ''})
})

app.post('/register', (req, res) => {
    res.render('registration', {message: ''})
})

app.post('/login', (req, res, next) => {
    processLogin(req.body, res);
})

function processLogin(params, res) {
    let userName = params.username;
    let password = params.password;
    console.log(userName + password);
    let tableName = 'test_table';
    let columnName = 'user_name';
    let myQuery = `SELECT password FROM "${tableName}" WHERE ${columnName} = '${userName}'`;
    console.log(myQuery);
    client.query(myQuery, 
        (error, result) => {
            if(error){
                console.log(error);
            } else {
                let dbpassword = result.rows[0].password;
                if(dbpassword === password){
                    res.render('welcome');
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
    console.log(userName + password);
    let tableName = 'test_table';
    let myQuery = `INSERT INTO ${tableName}(
        first_name, last_name, password, user_name)
	VALUES ('${firstName}', '${lastName}', '${password}', '${userName}');`;
    console.log(myQuery);
    client.query(myQuery, (error, result) => {
        if(error){
            res.render('registration', {message: 'Username already exists!'})   
        } else {
            res.render('login',{message: ""})
            }
        }
)}


app.get('/testdb', (req, res) => {
    getData(req,res);
})

app.listen(4000, () => {
    console.log('Listening on port 4000');
});

