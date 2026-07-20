const express = require('express');
const router = express.Router();
const controller = require('../controllers/hostelController');

router.get('/hostels', controller.listHostels);
router.get('/rooms', controller.getRooms);
router.post('/allocate', controller.allocateRoom);
router.post('/complaints', controller.createComplaint);

module.exports = router;
