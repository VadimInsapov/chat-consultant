const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig.development);
const User = require("./User");
const {USER, CHAT, MESSAGE} = require("../db/tableDenominations");

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
}

module.exports = Message;