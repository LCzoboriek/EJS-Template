const client = require('./db')
const user = require('./user.js');
const myTest = require('./restController')


function processEditProfile(params, res, myUser){
    // let myQuery = `SELECT password, first_name, id, isadmin, last_name FROM "${tableName}" WHERE ${columnName} = '${userName}'`;
    // client.query(myQuery, 
    //     (error, result) => {
    //         if(error){
    //             console.log(error);
    //         } else {
    //             myUser.setid = result.rows[0].id;
    //             myUser.setfirstname = result.rows[0].first_name;
    //             myUser.setlastname = result.rows[0].last_name;
    //             myUser.setpassword = dbpassword;
    //             console.table(myUser);
    //             res.render('welcome', {firstname: myUser.getfirstname, lastname: myUser.getlastname});
    //             } else {
    //                 res.render('login',{message: 'Invalid username or password'});
    //             }
    //         }
    console.log(myTest.myUser);
    console.table(myTest.myUser);
    res.render('editprofile', {username: myUser.getusername, firstname: myUser.getfirstname, lastname: myUser.getlastname, message: ""})
}


module.exports = {
    processEditProfile
}
