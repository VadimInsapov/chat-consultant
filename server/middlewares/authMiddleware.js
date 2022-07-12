const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован!"});
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован!"});
    }
}