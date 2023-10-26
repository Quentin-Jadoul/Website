// a class containing a teacher object

class User {
    constructor(firstname, lastname, email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.classes = [];
    }
}
module.exports = User;