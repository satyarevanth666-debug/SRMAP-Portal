const service = require('../services/examinationService');

exports.listExams = async (req, res, next) => {
  try { res.json(await service.listExams(req.query)); } catch (err) { next(err); }
};

exports.getExam = async (req, res, next) => {
  try { res.json(await service.getExam(parseInt(req.params.id))); } catch (err) { next(err); }
};

exports.createExam = async (req, res, next) => {
  try { const created = await service.createExam(req.body); res.status(201).json(created); } catch (err) { next(err); }
};

exports.listResults = async (req, res, next) => {
  try { res.json(await service.listResults(req.query)); } catch (err) { next(err); }
};

exports.createResult = async (req, res, next) => {
  try { const created = await service.createResult(req.body); res.status(201).json(created); } catch (err) { next(err); }
};
