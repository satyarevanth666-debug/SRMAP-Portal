const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listEvents = async (opts) => {
  return prisma.event.findMany({ orderBy: { date: 'desc' }, take: 100 });
};

exports.listEventAttendance = async (opts) => {
  return prisma.eventAttendance.findMany({ take: 200 });
};

exports.register = async (data) => {
  // expected { eventId, student }
  return prisma.eventAttendance.create({ data });
};
