const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig.development);
const User = require("./User");
const {USER, CHAT, MESSAGE, EMPLOYEE_CHANNEL, CHANNEL, EMPLOYEE, QUEST} = require("../db/tableDenominations");

class Message {
    constructor(userId, chatId, body) {
        this.userId = userId;
        this.chatId = chatId;
        this.body = body;
    }

    async save() {
        const resMessage = await knex(MESSAGE.tableName).insert(
            {
                [MESSAGE.columns.USER_ID]: this.userId,
                [MESSAGE.columns.CHAT_ID]: this.chatId,
                [MESSAGE.columns.BODY]: this.body,
            }
        ).returning('*');
        return resMessage[0];
    }
    static async getAllMessagesByChat(chatId){
        const CHAT_ID = `${CHAT.tableName}.${CHAT.columns.ID}`;
        const USER_ID = `${USER.tableName}.${USER.columns.ID}`;
        const messages = await knex
            .select('*')
            .from(MESSAGE.tableName)
            .join(CHAT.tableName, `${CHAT.tableName}.${CHAT.columns.ID}`, '=', `${MESSAGE.tableName}.${MESSAGE.columns.CHAT_ID}`)
            .join(USER.tableName, `${USER_ID}`, '=', `${MESSAGE.tableName}.${MESSAGE.columns.USER_ID}`)
            .where({[CHAT_ID]: chatId});
        return messages;
    }
}

module.exports = Message;