const Router = require('express');
const router = new Router();
const controller = require('../controllers/channelController');

router.get('/employee/:employeeId', controller.index);
router.post('/', controller.create);
router.delete('/channelId', controller.destroy);

module.exports = router;