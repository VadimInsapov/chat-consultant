const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig.development);
const {USER, EMPLOYEE} = require("../db/tableDenominations");
const User = require("./User");

class Channel {
    constructor() {
    }
    async save() {

    }
}

module.exports = Channel;