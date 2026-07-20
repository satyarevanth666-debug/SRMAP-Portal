const service = require('../services/academicService');

exports.getSubjects = async (req, res, next) => {
  try {
    const subjects = await service.listSubjects(req.query);
    res.json(subjects);
  } catch (err) {
    next(err);
  }
};

exports.getTimetable = async (req, res, next) => {
  try {
    const tt = await service.listTimetable(req.query);
    res.json(tt);
  } catch (err) { next(err); }
};

exports.getAttendance = async (req, res, next) => {
  try {
    const att = await service.listAttendance(req.query);
    res.json(att);
  } catch (err) { next(err); }
};

exports.getAttendanceSummary = async (req, res, next) => {
  try {
    const sum = await service.attendanceSummary(req.query);
    res.json(sum);
  } catch (err) { next(err); }
};

exports.getOdMl = async (req, res, next) => {
  try {
    const list = await service.listOdMl(req.query);
    res.json(list);
  } catch (err) { next(err); }
};

exports.applyOdMl = async (req, res, next) => {
  try {
    const created = await service.createOdMl(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
};

exports.getCourseRegistration = async (req, res, next) => {
  try {
    const regs = await service.listCourseRegistrations(req.query);
    res.json(regs);
  } catch (err) { next(err); }
};

exports.postCourseRegistration = async (req, res, next) => {
  try {
    const created = await service.createCourseRegistration(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
};
