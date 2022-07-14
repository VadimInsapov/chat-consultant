const Channel = require("../models/Channel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});

class ChannelController {
    async index(req, res) {
        try {
            const {employeeId} = req.params;
            const channels = await Channel.getChannelsInfoByEmployee(employeeId);
            res.status(200).json(channels);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка просмтора каналов"});
        }
    }

    async create(req, res) {
        try {
            const {domain, employeeId} = req.body;
            if (await Channel.ExistsByDomain(domain)) {
                res.status(400).json({message: `Домен ${domain} уже существует!`});
                return;
            }
            const channel = new Channel(domain, employeeId);
            const channelJsonFromDB = await channel.save();
            const channelScript = '<script src="' + `http://localhost/channel?channelId=${channelJsonFromDB.id}"` + ' async></script>';
            res.status(200).json(
                {
                    channelJsonFromDB, channelScript
                });
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка создания канала"});
        }
    }

    async destroy(req, res) {
        try {

        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка удаления канала"});
        }
    }

    async getEmployeesByChannel(req, res) {
        try {
            const {channelId} = req.params;
            const resEmployees = await Channel.getEmployeesByChannel(channelId);
            console.log(resEmployees)
            res.status(200).json(resEmployees);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка удаления канала"});
        }
    }
}

module.exports = new ChannelController();