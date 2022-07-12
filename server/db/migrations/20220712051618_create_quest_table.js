const {CHAT, EMPLOYEE, CHANNEL, QUEST, USER} = require("../tableDenominations");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable(QUEST.tableName, function (table) {
            table.increments(QUEST.columns.ID);
            table.integer(QUEST.columns.USER_ID).references(`${USER.tableName}.${USER.columns.ID}`);
            table.integer(QUEST.columns.CHAT_ID).references(`${CHAT.tableName}.${CHAT.columns.ID}`);
            table.string(QUEST.columns.CITY);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable(QUEST.tableName);
};
