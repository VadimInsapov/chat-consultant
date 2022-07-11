const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig.development);
const User = require("./User");
class Quest extends User {
    constructor(name, lastName, city) {
        super(name, lastName);
        this.email = city;
        this.password = city;
    }
    save() {

    }
}
module.exports = Quest;