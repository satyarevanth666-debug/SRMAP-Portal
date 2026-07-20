const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listSubjects = async (opts) => {
  return prisma.subject.findMany({ take: 200 });
};

exports.listTimetable = async (opts) => {
  return prisma.timetableEntry.findMany({ take: 200 });
};

exports.listAttendance = async (opts) => {
  return prisma.attendance.findMany({ take: 200 });
};

exports.attendanceSummary = async (opts) => {
  // simple grouped summary
  const rows = await prisma.attendance.groupBy({
    by: ['subjectId'],
    _avg: { percentage: true }
  }).catch(() => []);
  return rows;
};

exports.listOdMl = async (opts) => {
  return prisma.odMlRequest.findMany({ take: 200 });
};

exports.createOdMl = async (data) => {
  return prisma.odMlRequest.create({ data });
};

exports.listCourseRegistrations = async (opts) => {
  return prisma.courseRegistration.findMany({ take: 200 });
};

exports.createCourseRegistration = async (data) => {
  return prisma.courseRegistration.create({ data });
};
