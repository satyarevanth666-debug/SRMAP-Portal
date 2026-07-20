const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.list = async (opts) => {
  const studentId = opts.studentId;
  const where = studentId ? { where: { studentId } } : {};
  return prisma.verificationRequest.findMany(where);
};

exports.create = async (data) => prisma.verificationRequest.create({ data });

exports.get = async (id) => prisma.verificationRequest.findUnique({ where: { id }, include: { attachments: true } });

exports.addAttachment = async (data) => prisma.verificationAttachment.create({ data });
