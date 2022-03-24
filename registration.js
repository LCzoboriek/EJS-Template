const client = require('./db')
const user = require('./user.js');
let myUser = new user;

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

module.exports = {
    processRegistration
}