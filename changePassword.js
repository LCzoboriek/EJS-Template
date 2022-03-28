const client = require('./db')
const user = require('./user.js');
let myUser = new user;


function changePassword(params, res){
    let isLoggedIn = checkLoggedIn();
    if (isLoggedIn != true){
        res.render('login', {message: ""})
    } else {
    let userName = myUser.getusername;
    let password = myUser.password;
    let newPassword = params.password;
    let columnName = 'user_name'
    let myQuery = `UPDATE public.test_table SET password='${newPassword}' WHERE ${columnName} = '${userName}`;
    if(newPassword === password){
        res.render('editprofile', {username: myUser.getusername, message: "Update failed, password already used"})
    } else {
        client.query(myQuery,
            (error, result) => {
                if(error){
                    console.log(error);
                    res.status(500).send(error)
                } else {
                    res.render('welcome', {username: myUser.getusername, lastname: myUser.getlastname, message: ''})
                }
            })
    }
    }
}

module.exports = {
    changePassword
}