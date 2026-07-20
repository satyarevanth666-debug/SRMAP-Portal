const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventsController');

router.get('/', controller.listEvents);
router.get('/attendance', controller.listEventAttendance);
router.post('/register', controller.registerForEvent);

module.exports = router;
