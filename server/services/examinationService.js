const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listExams = async (opts) => {
  return prisma.exam.findMany();
};

exports.getExam = async (id) => {
  return prisma.exam.findUnique({ where: { id } });
};

exports.createExam = async (data) => {
  return prisma.exam.create({ data });
};

exports.listResults = async (opts) => {
  const studentId = opts.studentId;
  const where = studentId ? { where: { studentId } } : {};
  return prisma.result.findMany(where);
};

exports.createResult = async (data) => {
  return prisma.result.create({ data });
};
