const service = require('../services/sapService');

exports.getProcess = async (req, res, next) => {
  try {
    const data = await service.getProcess(req.query);
    res.json(data);
  } catch (err) { next(err); }
};

exports.postWithdraw = async (req, res, next) => {
  try {
    const created = await service.withdraw(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
};

exports.getDetails = async (req, res, next) => {
  try {
    const details = await service.getDetails(req.query);
    res.json(details);
  } catch (err) { next(err); }
};

exports.getAttachments = async (req, res, next) => {
  try {
    const list = await service.getAttachments(req.query);
    res.json(list);
  } catch (err) { next(err); }
};

exports.postAttachment = async (req, res, next) => {
  try {
    const created = await service.createAttachment(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
};

exports.postFeedback = async (req, res, next) => {
  try {
    const created = await service.createFeedback(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
};
