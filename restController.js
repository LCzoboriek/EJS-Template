const client = require('./db')
const user = require('./user.js');

let myUser = new user;

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
                    res.render('welcome', {firstname: myUser.getfirstname, lastname: myUser.getlastname});
                } else {
                    res.render('login',{message: 'Invalid username or password'});
                }
            } 
        })
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

module.exports = {
    validatePassword, checkUsername, myUser
}