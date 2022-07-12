const {QUEST, USER, CHAT, MESSAGE} = require("../tableDenominations");
/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema
        .createTable(MESSAGE.tableName, function (table) {
            table.increments(MESSAGE.columns.ID);
            table.integer(MESSAGE.columns.USER_ID).references(`${USER.tableName}.${USER.columns.ID}`);
            table.integer(MESSAGE.columns.CHAT_ID).references(`${CHAT.tableName}.${CHAT.columns.ID}`);
            table.string(MESSAGE.columns.BODY);
            table.timestamps(true, true);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable(MESSAGE.tableName);
};
