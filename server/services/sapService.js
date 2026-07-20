const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProcess = async (opts) => {
  // Return available SAP processes (simple list)
  return prisma.sapRecord.findMany({ take: 100 });
};

exports.withdraw = async (data) => {
  // expected { studentId, reason, type }
  return prisma.sapRecord.create({ data });
};

exports.getDetails = async (opts) => {
  const studentId = opts.studentId;
  if(!studentId) return [];
  return prisma.sapRecord.findMany({ where: { studentId } });
};

exports.getAttachments = async (opts) => {
  return prisma.sapAttachment.findMany({ take: 200 });
};

exports.createAttachment = async (data) => {
  // data: { sapRecordId, filename, url }
  return prisma.sapAttachment.create({ data });
};

exports.createFeedback = async (data) => {
  return prisma.sapFeedback.create({ data });
};
