const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig.development);
const {USER, EMPLOYEE} = require("../db/tableDenominations");
const User = require("./User");

class Employee extends User {
    constructor(name, lastName, email, password) {
        super(name, lastName);
        this.email = email;
        this.password = password;
    }

    async save() {
        const resUser = await knex(USER.tableName).insert(
            {
                [USER.columns.NAME]: this.name,
                [USER.columns.LAST_NAME]: this.lastName,
            }, USER.columns.ID
        );
        const userId = resUser[0].id;
        const resEmployee = await knex(EMPLOYEE.tableName).insert(
            {
                [EMPLOYEE.columns.EMAIL]: this.email,
                [EMPLOYEE.columns.PASSWORD]: this.password,
                [EMPLOYEE.columns.USER_ID]: userId,
            }
        ).returning('*');
        return resEmployee[0];
    }

    static async ExistsByEmail(email) {
        const employees = await knex(EMPLOYEE.tableName).where(EMPLOYEE.columns.EMAIL, email);
        return employees[0];
    }
}

module.exports = Employee;