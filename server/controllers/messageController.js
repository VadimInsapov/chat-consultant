const Channel = require("../models/Channel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Chat = require("../models/Chat");
const {CHAT, QUEST} = require("../db/tableDenominations");
const Quest = require("../models/Quest");
const Message = require("../models/Message");
require('dotenv').config({path: '../.env'});

class MessageController {
    async index(req, res) {
        try {

        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка просмотра сообщений!"});
        }
    }

    async create(body, questInfo) {
        try {
            let {userId = "", chatId = "", name, lastName, city} = questInfo;
            if (!userId) {
                const chat = new Chat(2);
                const chatJsonFromDB = await chat.save();
                chatId = chatJsonFromDB[CHAT.columns.ID];
                const quest = new Quest(name, lastName, city, chatId);
                const questJsonFromDB = await quest.save();
                userId = questJsonFromDB[QUEST.columns.USER_ID];
            }
            const message = new Message(userId, chatId, body);
            const messageJsonFromDB = await message.save();
            console.log(messageJsonFromDB);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка создания сообщения!"});
        }
    }

    async destroy(req, res) {
        try {

        } catch (e) {

        }
    }
}

module.exports = new MessageController();