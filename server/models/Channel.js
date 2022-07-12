const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig.development);
const {CHANNEL, EMPLOYEE_CHANNEL, EMPLOYEE, USER} = require("../db/tableDenominations");
const User = require("./User");

class Channel {
    constructor(domain, employeeId) {
        this.domain = domain;
        this.employeeId = employeeId;
    }

    static async ExistsByDomain(domain) {
        const domains = await knex(CHANNEL.tableName).where(CHANNEL.columns.DOMAIN, domain);
        return domains[0];
    }

    static async getChannelsInfoByEmployee(employeeId) {
        const EMPLOYEE_ID = `${EMPLOYEE_CHANNEL.tableName}.${EMPLOYEE_CHANNEL.columns.EMPLOYEE_ID}`;
        const EMPLOYEE_EMAIL = `${EMPLOYEE.tableName}.${EMPLOYEE.columns.EMAIL}`;
        const USER_NAME = `${USER.tableName}.${USER.columns.NAME}`;
        const USER_LAST_NAME = `${USER.tableName}.${USER.columns.LAST_NAME}`;
        const CHANNEL_ID = `${EMPLOYEE_CHANNEL.tableName}.${EMPLOYEE_CHANNEL.columns.CHANNEL_ID}`;
        const ROLE = `${EMPLOYEE_CHANNEL.tableName}.${EMPLOYEE_CHANNEL.columns.ROLE.columnName}`;
        const DOMAIN = `${CHANNEL.tableName}.${CHANNEL.columns.DOMAIN}`;
        const channelsByEmployee = await knex
            .select([
                CHANNEL_ID,
                DOMAIN,
            ])
            .from(EMPLOYEE_CHANNEL.tableName)
            .join(CHANNEL.tableName, `${CHANNEL.tableName}.${CHANNEL.columns.ID}`, '=', `${EMPLOYEE_CHANNEL.tableName}.${EMPLOYEE_CHANNEL.columns.CHANNEL_ID}`)
            .where({[EMPLOYEE_ID]: employeeId});
        const channelIds = channelsByEmployee.map(item => item[EMPLOYEE_CHANNEL.columns.CHANNEL_ID]);
        const channelsAndAllEmployees = await knex
            .select([
                EMPLOYEE_ID,
                CHANNEL_ID,
                DOMAIN,
                EMPLOYEE_EMAIL,
                USER_NAME,
                USER_LAST_NAME,
                ROLE,
            ])
            .from(EMPLOYEE_CHANNEL.tableName)
            .join(CHANNEL.tableName, `${CHANNEL.tableName}.${CHANNEL.columns.ID}`, '=', `${EMPLOYEE_CHANNEL.tableName}.${EMPLOYEE_CHANNEL.columns.CHANNEL_ID}`)
            .join(EMPLOYEE.tableName, `${EMPLOYEE.tableName}.${EMPLOYEE.columns.ID}`, '=', `${EMPLOYEE_CHANNEL.tableName}.${EMPLOYEE_CHANNEL.columns.EMPLOYEE_ID}`)
            .join(USER.tableName, `${USER.tableName}.${USER.columns.ID}`, '=', `${EMPLOYEE.tableName}.${EMPLOYEE.columns.USER_ID}`)
            .whereIn(CHANNEL_ID, channelIds)
        const groupedChannelsAndAllEmployees = channelsAndAllEmployees.reduce((acc, val) => {
            const {channel_id, domain, ...user} = val;
            const channelString = `${channel_id}|${val[CHANNEL.columns.DOMAIN]}`;
            if (!acc[channelString]) acc[channelString] = [];
            acc[channelString].push(user);
            return acc;
        }, {})
        return groupedChannelsAndAllEmployees;
    }

    async save() {
        const resChannel = await knex(CHANNEL.tableName).insert(
            {
                [CHANNEL.columns.DOMAIN]: this.domain,
            }
        ).returning('*');
        const channelId = resChannel[0].id;
        await knex(EMPLOYEE_CHANNEL.tableName).insert(
            {
                [EMPLOYEE_CHANNEL.columns.CHANNEL_ID]: channelId,
                [EMPLOYEE_CHANNEL.columns.EMPLOYEE_ID]: this.employeeId,
                [EMPLOYEE_CHANNEL.columns.ROLE.columnName]: EMPLOYEE_CHANNEL.columns.ROLE.values.ADMIN,
            }
        );
        return resChannel[0];
    }
}

module.exports = Channel;