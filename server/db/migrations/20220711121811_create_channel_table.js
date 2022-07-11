const {CHANNEL} = require('../tableDenominations');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable(CHANNEL.tableName, function (table) {
            table.increments(CHANNEL.columns.ID);
            table.string(CHANNEL.columns.DOMAIN, 255).notNullable();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable(CHANNEL.tableName);
};
