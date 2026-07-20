const express = require('express');
const router = express.Router();
const controller = require('../controllers/examinationController');

router.get('/exams', controller.listExams);
router.get('/exams/:id', controller.getExam);
router.post('/exams', controller.createExam);

router.get('/results', controller.listResults);
router.post('/results', controller.createResult);

module.exports = router;
