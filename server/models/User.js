const {USER, EMPLOYEE_CHANNEL, CHANNEL} = require("../db/tableDenominations");
const knexConfig = require("../db/knexfile");
const knex = require("knex")(knexConfig.development);
;

class User {
    constructor(name, lastName) {
        this.lastName = lastName;
        this.name = name;
    }

    getFullName() {
        return `${this.name} ${this.lastName}`;
    }

    static async getUserByID(id) {
        const user = await knex
            .select("*")
            .from(USER.tableName)
            .where({[USER.columns.ID]: id});
        return user[0];
    }
}

module.exports = User;