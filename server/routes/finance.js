const express = require('express');
const router = express.Router();
const controller = require('../controllers/financeController');

router.get('/overview', controller.getOverview);
router.get('/transactions', controller.getTransactions);
router.post('/payments', controller.postPayment);
router.get('/fees', controller.getFees);
router.post('/fees', controller.postFee);

module.exports = router;
