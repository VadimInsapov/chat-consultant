const Employee = require("../models/Employee");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const {USER, EMPLOYEE} = require("../db/tableDenominations");
require('dotenv').config({path: '../.env'});

class EmployeeController {
    async registration(req, res) {
        try {
            let {name, lastName, email, password} = req.body;
            if (await Employee.ExistsByEmail(email)) {
                res.status(400).json({message: `Пользователь ${email} уже существует!`});
                return;
            }
            password = bcrypt.hashSync(password, 7);
            const employee = new Employee(name, lastName, email, password);
            const employeeJsonFromDB = await employee.save();
            res.status(200).json(employeeJsonFromDB);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка регистрации"});
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;
            let employeeJsonFromDB = await Employee.ExistsByEmail(email);
            if (!await Employee.ExistsByEmail(email)) {
                res.status(400).json({message: `Пользователь ${email} не найден!`});
                return;
            }
            const validPassword = bcrypt.compareSync(password, employeeJsonFromDB.password);
            if (!validPassword) {
                res.status(400).json({message: `Введён неверный пароль!`});
            }
            delete employeeJsonFromDB.password;
            const user = await Employee.getUserByID(employeeJsonFromDB[EMPLOYEE.columns.USER_ID]);
            employeeJsonFromDB = {...employeeJsonFromDB, ...user};
            const token = genereateAccessToken(employeeJsonFromDB);
            res.status(200).json({token: token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка входа"});
        }
    }

    async addToTheChat(req, res) {
        try {
            const {employeeId, chatId} = req.params;
            const relationJsonFromDB = await Employee.addEmployeeChatRelation(employeeId, chatId);
            res.status(300).json(relationJsonFromDB);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка входа"});
        }
    }
}
function genereateAccessToken (employeeJsonFromDB) {
    return jwt.sign(employeeJsonFromDB, process.env.JWT_SECRET_KEY, {expiresIn: "1000h"});
}
module.exports = new EmployeeController();