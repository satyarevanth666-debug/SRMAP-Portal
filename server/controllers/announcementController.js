const service = require('../services/announcementService');

exports.list = async (req, res, next) => { try { res.json(await service.list(req.query)); } catch (err) { next(err); } };
exports.create = async (req, res, next) => { try { const c = await service.create(req.body); res.status(201).json(c); } catch (err) { next(err); } };
exports.get = async (req, res, next) => { try { res.json(await service.get(parseInt(req.params.id))); } catch (err) { next(err); } };
exports.update = async (req, res, next) => { try { res.json(await service.update(parseInt(req.params.id), req.body)); } catch (err) { next(err); } };
