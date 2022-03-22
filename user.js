class myUser {
    constructor(first_name, last_name, id, password, user_name, isadmin){
        this.first_name = first_name;
        this.last_name = last_name;
        this.id = id;
        this.password = password;
        this.user_name = user_name;
        this.isadmin = isadmin;
    } 

    get getfirstname() {
        return this.first_name;
    }

    get getlastname() {
        return this.last_name;
    }

    get getid() {
        return this.id;
    }

    get getpassword() {
        return this.password;
    }

    get getusername() {
        return this.user_name;
    }

    get getisadmin() {
        return this.isadmin;
    }

    set setfirstname(first_name) {
        this.first_name = first_name
    }

    set setlastname(last_name) {
        this.last_name = last_name
    }

    set setid(id) {
        this.id = id
    }

    set setpassword(password) {
        this.password = password
    }

    set setusername(user_name) {
        this.user_name = user_name
    }

    set setisadmin(isadmin) {
        this.isadmin = isadmin
    }

    
}

module.exports = myUser;