const service = require('../services/financeService');

exports.getOverview = async (req, res, next) => {
  try {
    const data = await service.getOverview(req.query);
    res.json(data);
  } catch (err) { next(err); }
};

exports.getTransactions = async (req, res, next) => {
  try {
    const data = await service.getTransactions(req.query);
    res.json(data);
  } catch (err) { next(err); }
};

exports.postPayment = async (req, res, next) => {
  try {
    const created = await service.createPayment(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
};

exports.getFees = async (req, res, next) => {
  try {
    const fees = await service.getFees(req.query);
    res.json(fees);
  } catch (err) { next(err); }
};

exports.postFee = async (req, res, next) => {
  try {
    const created = await service.createFee(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
};
