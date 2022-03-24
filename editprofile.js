const client = require('./db')
const user = require('./user.js');
const myTest = require('./restController')


function processEditProfile(params, res){
    res.render('editprofile', {username: myTest.myUser.getusername, firstname: myTest.myUser.getfirstname, lastname: myTest.myUser.getlastname, message: ""})
}


module.exports = {
    processEditProfile
}
