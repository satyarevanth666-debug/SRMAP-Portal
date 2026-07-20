const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getOverview = async (opts) => {
  const totalFees = await prisma.fee.aggregate({ _sum: { amount: true } }).catch(()=>({ _sum: { amount: 0 } }));
  const totalPaid = await prisma.payment.aggregate({ _sum: { amount: true } }).catch(()=>({ _sum: { amount: 0 } }));
  return {
    totalFees: totalFees._sum.amount || 0,
    totalPaid: totalPaid._sum.amount || 0,
    outstanding: (totalFees._sum.amount || 0) - (totalPaid._sum.amount || 0)
  };
};

exports.getTransactions = async (opts) => {
  const studentId = opts.studentId;
  const where = studentId ? { where: { studentId } } : {};
  return prisma.financeTransaction.findMany(where);
};

exports.createPayment = async (data) => {
  // expected { studentId, amount, method, reference }
  const payment = await prisma.payment.create({ data });
  // also create a financeTransaction entry
  await prisma.financeTransaction.create({ data: {
    studentId: data.studentId,
    type: 'payment',
    amount: data.amount,
    metadata: data.reference || null,
  }});
  return payment;
};

exports.getFees = async (opts) => {
  return prisma.fee.findMany();
};

exports.createFee = async (data) => {
  return prisma.fee.create({ data });
};
