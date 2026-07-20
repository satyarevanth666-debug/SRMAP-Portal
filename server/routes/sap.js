const express = require('express');
const router = express.Router();
const controller = require('../controllers/sapController');

router.get('/process', controller.getProcess);
router.post('/withdraw', controller.postWithdraw);
router.get('/details', controller.getDetails);
router.get('/attachments', controller.getAttachments);
router.post('/attachments', controller.postAttachment);
router.post('/feedback', controller.postFeedback);

module.exports = router;
