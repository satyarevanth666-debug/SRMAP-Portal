const service = require('../services/verificationService');

exports.list = async (req, res, next) => { try { res.json(await service.list(req.query)); } catch (err) { next(err); } };
exports.create = async (req, res, next) => { try { const c = await service.create(req.body); res.status(201).json(c); } catch (err) { next(err); } };
exports.get = async (req, res, next) => { try { res.json(await service.get(parseInt(req.params.id))); } catch (err) { next(err); } };
exports.addAttachment = async (req, res, next) => { try { const c = await service.addAttachment(req.body); res.status(201).json(c); } catch (err) { next(err); } };
