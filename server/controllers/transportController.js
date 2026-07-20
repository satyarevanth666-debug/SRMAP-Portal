const service = require('../services/transportService');

exports.listRoutes = async (req, res, next) => { try { res.json(await service.listRoutes()); } catch (err) { next(err); } };
exports.getStops = async (req, res, next) => { try { res.json(await service.getStops(req.query)); } catch (err) { next(err); } };
exports.requestPass = async (req, res, next) => { try { const c = await service.requestPass(req.body); res.status(201).json(c); } catch (err) { next(err); } };
