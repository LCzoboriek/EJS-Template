const client = require('./db')
const user = require('./user.js');
const myTest = require('./restController')

function processEditProfile(params, res){
    res.render('editprofile', {username: myTest.myUser.getusername, firstname: myTest.myUser.getfirstname, lastname: myTest.myUser.getlastname, message: ""})
    console.log(myTest.myUser.getid);
    console.log(myTest.myUser.getusername);
}

function checkLoggedIn(){
    console.log(myTest.myUser.getid, myTest.myUser.getusername);
    if(myTest.myUser.getid || myTest.myUser.getusername == ''){
        return false
    } else {
        return true
    }
}


function changePassword(params, res){
    console.log(myTest.myUser.getid);
    console.log(myTest.myUser.getusername);
    let isLoggedIn = checkLoggedIn();
    console.log(isLoggedIn);
    if (isLoggedIn != true){
        res.render('login', {message: ""})
    } else {
    let userName = myTest.myUser.getusername;
    let password = myTest.myUser.password;
    let newPassword = params.password;
    let columnName = 'user_name'
    let myQuery = `UPDATE public.test_table SET password='${newPassword}' WHERE ${columnName} = '${userName}`;
    if(newPassword === password){
        res.render('editprofile', {username: myTest.myUser.getusername, message: "Update failed, password already used"})
    } else {
        client.query(myQuery,
            (error, result) => {
                if(error){
                    console.log(error);
                    res.status(500).send(error)
                } else {
                    res.render('welcome', {username: myTest.myUser.getusername, lastname: myTest.myUser.getlastname})
                }
            })
    }
    }
}
module.exports = {
    processEditProfile, changePassword
}
