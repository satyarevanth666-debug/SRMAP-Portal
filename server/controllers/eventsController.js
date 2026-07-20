const service = require('../services/eventsService');

exports.listEvents = async (req, res, next) => {
  try {
    const events = await service.listEvents(req.query);
    res.json(events);
  } catch (err) { next(err); }
};

exports.listEventAttendance = async (req, res, next) => {
  try {
    const rows = await service.listEventAttendance(req.query);
    res.json(rows);
  } catch (err) { next(err); }
};

exports.registerForEvent = async (req, res, next) => {
  try {
    const created = await service.register(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
};
