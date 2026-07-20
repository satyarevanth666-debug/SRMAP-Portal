const express = require('express');
const router = express.Router();
const controller = require('../controllers/transportController');

router.get('/routes', controller.listRoutes);
router.get('/stops', controller.getStops);
router.post('/pass-requests', controller.requestPass);

module.exports = router;
