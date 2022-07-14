const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig.development);
const {USER, EMPLOYEE, EMPLOYEE_CHAT} = require("../db/tableDenominations");
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

    static async addEmployeeChatRelation(employeeId, chatId) {
        const resRelation = await knex(EMPLOYEE_CHAT.tableName).insert(
            {
                [EMPLOYEE_CHAT.columns.EMPLOYEE_ID]: employeeId,
                [EMPLOYEE_CHAT.columns.CHAT_ID]: chatId,
            }
        ).returning('*');
        return resRelation[0];
    }
}

module.exports = Employee;