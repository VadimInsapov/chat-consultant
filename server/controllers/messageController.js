const Channel = require("../models/Channel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Chat = require("../models/Chat");
const {CHAT, QUEST} = require("../db/tableDenominations");
const Quest = require("../models/Quest");
const Message = require("../models/Message");
require('dotenv').config({path: '../.env'});

class MessageController {
    async index(chatId) {
        try {
            const messages = await Message.getAllMessagesByChat(chatId);
            return messages;
        } catch (e) {
            console.log(e);
        }
    }

    async create(body, questInfo) {
        try {
            let {userId = "", chatId = "", channelId = "", name, lastName, city} = questInfo;
            if (!userId) {
                const chat = new Chat(channelId);
                const chatJsonFromDB = await chat.save();
                chatId = chatJsonFromDB[CHAT.columns.ID];
                const quest = new Quest(name, lastName, city, chatId);
                const questJsonFromDB = await quest.save();
                userId = questJsonFromDB[QUEST.columns.USER_ID];
            }
            const message = new Message(userId, chatId, body);
            const messageJsonFromDB = await message.save();
            return messageJsonFromDB;
        } catch (e) {
            console.log(e);
        }
    }

    async destroy(req, res) {
        try {

        } catch (e) {

        }
    }
}

module.exports = new MessageController();