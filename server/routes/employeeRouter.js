const Router = require('express');
const router = new Router();
const controller = require('../controllers/employeeController');

router.post('/auth/registration', controller.registration);
router.post('/auth/login', controller.login);
router.get('/:employeeId/addToTheChat/:chatId', controller.addToTheChat);

module.exports = router;