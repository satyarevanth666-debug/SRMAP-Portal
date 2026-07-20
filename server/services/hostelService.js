const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listHostels = async () => {
  return prisma.hostel.findMany();
};

exports.getRooms = async (opts) => {
  const hostelId = opts.hostelId;
  const where = hostelId ? { where: { hostelId: parseInt(hostelId) } } : {};
  return prisma.room.findMany(where);
};

exports.allocateRoom = async (data) => {
  // data: { roomId, studentId, fromDate, toDate }
  return prisma.allocation.create({ data });
};

exports.createComplaint = async (data) => {
  return prisma.complaint.create({ data });
};
