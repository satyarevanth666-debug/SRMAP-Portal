const express = require('express');
const router = express.Router();
const controller = require('../controllers/academicController');

router.get('/subjects', controller.getSubjects);
router.get('/timetable', controller.getTimetable);
router.get('/attendance', controller.getAttendance);
router.get('/attendance-summary', controller.getAttendanceSummary);
router.get('/od-ml', controller.getOdMl);
router.post('/od-ml/apply', controller.applyOdMl);
router.get('/course-registration', controller.getCourseRegistration);
router.post('/course-registration', controller.postCourseRegistration);

module.exports = router;
