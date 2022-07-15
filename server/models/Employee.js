const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig.development);
const {
    USER,
    EMPLOYEE,
    EMPLOYEE_CHAT,
    EMPLOYEE_CHANNEL,
    MESSAGE,
    CHAT,
    QUEST,
    CHANNEL
} = require("../db/tableDenominations");
const User = require("./User");

class Employee extends User {
    constructor(name, lastName, email, password) {
        super(name, lastName);
        this.email = email;
        this.password = password;
    }

    async save() {
        const resUser = await knex(USER.tableName).insert(
            {
                [USER.columns.NAME]: this.name,
                [USER.columns.LAST_NAME]: this.lastName,
            }, USER.columns.ID
        );
        const userId = resUser[0].id;
        const resEmployee = await knex(EMPLOYEE.tableName).insert(
            {
                [EMPLOYEE.columns.EMAIL]: this.email,
                [EMPLOYEE.columns.PASSWORD]: this.password,
                [EMPLOYEE.columns.USER_ID]: userId,
            }
        ).returning('*');
        return resEmployee[0];
    }

    static async ExistsByEmail(email) {
        const employees = await knex(EMPLOYEE.tableName).where(EMPLOYEE.columns.EMAIL, email);
        return employees[0];
    }

    static async addEmployeeChatRelation(employeeId, chatId) {
        const resRelation = await knex(EMPLOYEE_CHAT.tableName).insert(
            {
                [EMPLOYEE_CHAT.columns.EMPLOYEE_ID]: employeeId,
                [EMPLOYEE_CHAT.columns.CHAT_ID]: chatId,
            }
        ).returning('*');
        return resRelation[0];
    }

    static async addEmployeeChannelRelation(employeeId, channelId, role) {
        const resRelation = await knex(EMPLOYEE_CHANNEL.tableName).insert(
            {
                [EMPLOYEE_CHANNEL.columns.EMPLOYEE_ID]: employeeId,
                [EMPLOYEE_CHANNEL.columns.CHANNEL_ID]: channelId,
                [EMPLOYEE_CHANNEL.columns.ROLE.columnName]: role,
            }
        ).returning('*');
        return resRelation[0];
    }

    static async getAll() {
        const employees = await knex(EMPLOYEE.tableName);
        return employees;
    }

    static async getAllIncomingMessages(employeeId) {
        const employeeChannelsChats = await knex
            .select('*')
            .from(EMPLOYEE_CHANNEL.tableName)
            .join(CHAT.tableName, `${CHAT.tableName}.${CHAT.columns.CHANNEL_ID}`, '=', `${EMPLOYEE_CHANNEL.tableName}.${EMPLOYEE_CHANNEL.columns.CHANNEL_ID}`)
            .where({[EMPLOYEE_CHANNEL.columns.EMPLOYEE_ID]: employeeId})

        const employeeChats = await knex
            .select('*')
            .from(EMPLOYEE_CHAT.tableName)
            .where({[EMPLOYEE_CHAT.columns.EMPLOYEE_ID]: employeeId})

        const employeeChannelsChatsIds = employeeChannelsChats.map((item) => item.id);
        const employeeChatsIds = employeeChats.map((item) => item.chat_id);
        const incomingChatsIds = employeeChannelsChatsIds.filter(item => !employeeChatsIds.includes(item));

        // console.log(employeeChannelsChats);
        // console.log(employeeChats);
        // console.log(incomingChatsIds);


        const USER_ID = `${QUEST.tableName}.${QUEST.columns.USER_ID}`;
        const CHAT_ID = `${QUEST.tableName}.${QUEST.columns.CHAT_ID}`;
        const CITY = `${QUEST.tableName}.${QUEST.columns.CITY}`;
        const NAME = `${USER.tableName}.${USER.columns.NAME}`;
        const LAST_NAME = `${USER.tableName}.${USER.columns.LAST_NAME}`;
        const employeeChannelsChatsQuests = await knex
            .select([
                USER_ID,
                CHAT_ID,
                CITY,
                NAME,
                LAST_NAME
            ])
            .from(QUEST.tableName)
            .join(USER.tableName, `${USER.tableName}.${USER.columns.ID}`, '=', `${QUEST.tableName}.${QUEST.columns.USER_ID}`)
            .whereIn([QUEST.columns.CHAT_ID], incomingChatsIds)
        console.log(employeeChannelsChatsQuests);


        let employeeChannelsChatsMessages = await knex
            .select('*')
            .from(MESSAGE.tableName)
            .join(USER.tableName, `${USER.tableName}.${USER.columns.ID}`, '=', `${MESSAGE.tableName}.${MESSAGE.columns.USER_ID}`)
            .whereIn([MESSAGE.columns.CHAT_ID], incomingChatsIds)
        employeeChannelsChatsMessages = employeeChannelsChatsMessages.map(item => {
            const {id, ...other} = item;
            return other;
        })


        const groupedQuestsMessages = [];

        for (const quest of employeeChannelsChatsQuests) {
            const object = {};
            object.quest = quest;
            const array2 = [];
            for (const message of employeeChannelsChatsMessages) {
                if (quest.chat_id === message.chat_id) {
                    array2.push(message);
                }
            }
            object.messages = array2;
            groupedQuestsMessages.push(object);
        }
        return groupedQuestsMessages;
    }

    static async getIncomingQuests(employeeId) {
        const employeeChannelsChats = await knex
            .select('*')
            .from(EMPLOYEE_CHANNEL.tableName)
            .join(CHAT.tableName, `${CHAT.tableName}.${CHAT.columns.CHANNEL_ID}`, '=', `${EMPLOYEE_CHANNEL.tableName}.${EMPLOYEE_CHANNEL.columns.CHANNEL_ID}`)
            .where({[EMPLOYEE_CHANNEL.columns.EMPLOYEE_ID]: employeeId})

        const employeeChats = await knex
            .select('*')
            .from(EMPLOYEE_CHAT.tableName)
            .where({[EMPLOYEE_CHAT.columns.EMPLOYEE_ID]: employeeId})

        const employeeChannelsChatsIds = employeeChannelsChats.map((item) => item.id);
        const employeeChatsIds = employeeChats.map((item) => item.chat_id);
        const incomingChatsIds = employeeChannelsChatsIds.filter(item => !employeeChatsIds.includes(item));

        const USER_ID = `${QUEST.tableName}.${QUEST.columns.USER_ID}`;
        const CHAT_ID = `${QUEST.tableName}.${QUEST.columns.CHAT_ID}`;
        const CITY = `${QUEST.tableName}.${QUEST.columns.CITY}`;
        const NAME = `${USER.tableName}.${USER.columns.NAME}`;
        const LAST_NAME = `${USER.tableName}.${USER.columns.LAST_NAME}`;
        const employeeChannelsChatsQuests = await knex
            .select([
                USER_ID,
                CHAT_ID,
                CITY,
                NAME,
                LAST_NAME
            ])
            .from(QUEST.tableName)
            .join(USER.tableName, `${USER.tableName}.${USER.columns.ID}`, '=', `${QUEST.tableName}.${QUEST.columns.USER_ID}`)
            .whereIn([QUEST.columns.CHAT_ID], incomingChatsIds)
        console.log(employeeChannelsChatsQuests);

        return employeeChannelsChatsQuests;
    }

}

module.exports = Employee;