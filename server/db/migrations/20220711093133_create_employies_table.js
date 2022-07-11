const {USER,EMPLOYEE} = require('../tableDenominations');
/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema
        .createTable(EMPLOYEE.tableName, function (table) {
            table.increments(EMPLOYEE.columns.ID);
            table.string(EMPLOYEE.columns.EMAIL, 255).notNullable();
            table.string(EMPLOYEE.columns.PASSWORD).notNullable();
            table.integer(EMPLOYEE.columns.USER_ID).references(`${USER.tableName}.${USER.columns.ID}`);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable(EMPLOYEE.tableName);
};
