const client = require('./db')
const user = require('./user.js');
const myTest = require('./restController')

function processEditProfile(params, res){
    res.render('editprofile', {username: myTest.myUser.getusername, firstname: myTest.myUser.getfirstname, lastname: myTest.myUser.getlastname, message: ""})
    console.log(myTest.myUser.getid);
    console.log(myTest.myUser.getusername);
}

function checkLoggedIn(){
    console.log('Im about to check logged in and below are the values there');
    console.log(myTest.myUser.getid, myTest.myUser.getusername);
    if(myTest.myUser.getusername === ''){
        return false
    } else {
        return true
    }
    // if(myTest.myUser.getid || myTest.myUser.getusername == ''){
    //     console.log('im now returning false on the check logged in function');
    //     return false
    // } else {
    //     return true
    // }
}


function changePassword(params, res){
    let isLoggedIn = checkLoggedIn();
    if (isLoggedIn != true){
        res.render('login', {message: ""})
    } else {
    let userName = myTest.myUser.getusername;
    let password = myTest.myUser.password;
    let firstname = myTest.myUser.getfirstname;
    let newPassword = params.password;
    let columnName = 'user_name'
    let myQuery = `UPDATE public.test_table SET password='${newPassword}' WHERE ${columnName} = '${userName}'`;
    if(newPassword === password){
        res.render('editprofile', {username: myTest.myUser.getusername, firstname: myTest.myUser.getusername, lastname: myTest.myUser.getlastname, message: "Update failed, password already used"})
    } else {
        client.query(myQuery,
            (error, result) => {
                if(error){
                    console.log(error);
                    res.status(500).send(error)
                } else {
                    res.render('login', {message: 'Password Updated'})
                }
            })
    }
    }
}
module.exports = {
    processEditProfile, changePassword
}
