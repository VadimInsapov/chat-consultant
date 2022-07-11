const Router = require('express');
const router = new Router();
const controller = require('../controllers/channelController');

router.get('/channels/:employeeId', controller.index);
router.post('/channels', controller.create);
router.delete('/channels/channelId', controller.destroy);

module.exports = router;