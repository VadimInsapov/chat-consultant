const Router = require('express');
const router = new Router();
const controller = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/auth/registration', controller.registration);
router.post('/auth/login', controller.login);
router.put('/chat', authMiddleware, controller.addToTheChat);
router.put('/channel', authMiddleware,  controller.addToTheChannel);
router.get('/', controller.index);

module.exports = router;