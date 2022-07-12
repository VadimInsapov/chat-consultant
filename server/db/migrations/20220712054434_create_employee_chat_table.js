const {EMPLOYEE_CHANNEL, EMPLOYEE_CHAT, EMPLOYEE, CHANNEL, CHAT} = require("../tableDenominations");
/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema
        .createTable(EMPLOYEE_CHAT.tableName, function (table) {
            table.integer(EMPLOYEE_CHAT.columns.EMPLOYEE_ID).references(`${EMPLOYEE.tableName}.${EMPLOYEE.columns.ID}`);
            table.integer(EMPLOYEE_CHAT.columns.CHAT_ID).references(`${CHAT.tableName}.${CHAT.columns.ID}`);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable(EMPLOYEE_CHAT.tableName);
};
