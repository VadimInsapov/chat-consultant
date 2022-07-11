class User {
    constructor(name, lastName) {
        this.lastName = lastName;
        this.name = name;
    }
    getFullName(){
        return `${this.name} ${this.lastName}`;
    }
}
module.exports = User;