const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listRoutes = async () => prisma.transportRoute.findMany();

exports.getStops = async (opts) => {
  const routeId = opts.routeId;
  const where = routeId ? { where: { routeId: parseInt(routeId) } } : {};
  return prisma.stop.findMany(where);
};

exports.requestPass = async (data) => prisma.passRequest.create({ data });
