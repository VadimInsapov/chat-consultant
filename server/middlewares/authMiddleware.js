module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован!"});
        }
        next();
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован!"});
    }
}