const express = require('express');
const router = express.Router();
const controller = require('../controllers/feedbackController');

router.get('/tickets', controller.listTickets);
router.post('/tickets', controller.createTicket);
router.get('/tickets/:id', controller.getTicket);
router.put('/tickets/:id', controller.updateTicket);

module.exports = router;
