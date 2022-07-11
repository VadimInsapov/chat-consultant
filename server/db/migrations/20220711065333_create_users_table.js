const {USER} = require('../tableDenominations');
/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function (knex) {
    return knex.schema
        .createTable(USER.tableName, function (table) {
            table.increments(USER.columns.ID);
            table.string(USER.columns.NAME, 255);
            table.string(USER.columns.LAST_NAME, 255);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable(USER.tableName);
};
