const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig.development);
const User = require("./User");
const {USER, QUEST} = require("../db/tableDenominations");
class Quest extends User {
    constructor(name, lastName, city, chatId) {
        super(name, lastName);
        this.city = city;
        this.chatId = chatId;
    }
    async save() {
        const resUser = await knex(USER.tableName).insert(
            {
                [USER.columns.NAME]: this.name,
                [USER.columns.LAST_NAME]: this.lastName,
            }, USER.columns.ID
        );
        const userId = resUser[0].id;
        const resQuest = await knex(QUEST.tableName).insert(
            {
                [QUEST.columns.USER_ID]: userId,
                [QUEST.columns.CHAT_ID]: this.chatId,
                [QUEST.columns.CITY]: this.city,
            }
        ).returning('*');
        return resQuest[0];
    }
}
module.exports = Quest;