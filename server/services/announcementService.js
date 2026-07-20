const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.list = async (opts) => prisma.announcement.findMany({ orderBy: { createdAt: 'desc' } });
exports.get = async (id) => prisma.announcement.findUnique({ where: { id } });
exports.create = async (data) => prisma.announcement.create({ data });
exports.update = async (id, data) => prisma.announcement.update({ where: { id }, data });
