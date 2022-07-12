const {EMPLOYEE_CHANNEL, EMPLOYEE, CHANNEL, CHAT} = require("../tableDenominations");
/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema
        .createTable(CHAT.tableName, function (table) {
            table.increments(CHAT.columns.ID);
            table.integer(CHAT.columns.CHANNEL_ID).references(`${CHANNEL.tableName}.${CHANNEL.columns.ID}`);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable(CHAT.tableName);
};
