const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig.development);
const User = require("./User");
const {USER, CHAT} = require("../db/tableDenominations");

class Chat {
    constructor(channelId) {
        this.channelId = channelId;
    }

    async save() {
        const resChat = await knex(CHAT.tableName).insert(
            {
                [CHAT.columns.CHANNEL_ID]: this.channelId,
            }
        ).returning('*');
        return resChat[0];
    }
}

module.exports = Chat;