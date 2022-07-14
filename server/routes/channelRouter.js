const Router = require('express');
const router = new Router();
const controller = require('../controllers/channelController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/employee/:employeeId', authMiddleware, controller.index);
router.post('/', authMiddleware, controller.create);
router.delete('/:channelId', authMiddleware, controller.destroy);
router.get('/:channelId', authMiddleware, controller.getEmployeesByChannel);

module.exports = router;