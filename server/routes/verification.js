const express = require('express');
const router = express.Router();
const controller = require('../controllers/verificationController');

router.get('/', controller.list);
router.post('/', controller.create);
router.get('/:id', controller.get);
router.post('/attachments', controller.addAttachment);

module.exports = router;
