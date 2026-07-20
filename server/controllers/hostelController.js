const service = require('../services/hostelService');

exports.listHostels = async (req, res, next) => { try { res.json(await service.listHostels()); } catch (err) { next(err); } };
exports.getRooms = async (req, res, next) => { try { res.json(await service.getRooms(req.query)); } catch (err) { next(err); } };
exports.allocateRoom = async (req, res, next) => { try { const c = await service.allocateRoom(req.body); res.status(201).json(c); } catch (err) { next(err); } };
exports.createComplaint = async (req, res, next) => { try { const c = await service.createComplaint(req.body); res.status(201).json(c); } catch (err) { next(err); } };
