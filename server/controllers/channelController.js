const Employee = require("../models/Employee");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});

class ChannelController {
    async index(req, res) {
        try {

        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка просмтора каналов"});
        }
    }

    async create(req, res) {
        try {

        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка создания канала"});
        }
    }
    async destroy (req, res) {
        try {

        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка удаления канала"});
        }
    }
}

module.exports = new ChannelController();