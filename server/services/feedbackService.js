const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listTickets = async (opts) => {
  const studentId = opts.studentId;
  const where = studentId ? { where: { studentId } } : {};
  return prisma.feedbackTicket.findMany(where);
};

exports.createTicket = async (data) => prisma.feedbackTicket.create({ data });

exports.getTicket = async (id) => prisma.feedbackTicket.findUnique({ where: { id } });

exports.updateTicket = async (id, data) => prisma.feedbackTicket.update({ where: { id }, data });
