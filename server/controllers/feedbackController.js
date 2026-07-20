const service = require('../services/feedbackService');

exports.listTickets = async (req, res, next) => { try { res.json(await service.listTickets(req.query)); } catch (err) { next(err); } };
exports.createTicket = async (req, res, next) => { try { const c = await service.createTicket(req.body); res.status(201).json(c); } catch (err) { next(err); } };
exports.getTicket = async (req, res, next) => { try { res.json(await service.getTicket(parseInt(req.params.id))); } catch (err) { next(err); } };
exports.updateTicket = async (req, res, next) => { try { const u = await service.updateTicket(parseInt(req.params.id), req.body); res.json(u); } catch (err) { next(err); } };
