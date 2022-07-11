const {CHANNEL, EMPLOYEE_CHANNEL, USER, EMPLOYEE} = require('../tableDenominations');

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema
        .createTable(EMPLOYEE_CHANNEL.tableName, function (table) {
            table.integer(EMPLOYEE_CHANNEL.columns.EMPLOYEE_ID).references(`${EMPLOYEE.tableName}.${EMPLOYEE.columns.ID}`);
            table.integer(EMPLOYEE_CHANNEL.columns.CHANNEL_ID).references(`${CHANNEL.tableName}.${CHANNEL.columns.ID}`);
            table.string(EMPLOYEE_CHANNEL.columns.ROLE.columnName, 255).notNullable();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable(EMPLOYEE_CHANNEL.tableName);
};
