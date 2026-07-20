const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.subject.createMany({ data: [
    { code: 'CS101', name: 'Introduction to Programming', credits: 4 },
    { code: 'CS102', name: 'Data Structures', credits: 4 },
    { code: 'MA101', name: 'Calculus', credits: 3 }
  ], skipDuplicates: true });

  const subjects = await prisma.subject.findMany();

  await prisma.timetableEntry.createMany({ data: [
    { subjectId: subjects[0].id, day: 'Mon', startTime: '09:00', endTime: '10:30' },
    { subjectId: subjects[1].id, day: 'Tue', startTime: '11:00', endTime: '12:30' }
  ] });

  await prisma.odMlRequest.create({ data: { studentId: 'AP25110010642', type: 'OD', reason: 'Medical', status: 'approved' } });

  // Events sample
  await prisma.event.createMany({ data: [
    { title: 'Orientation Day', date: new Date() },
    { title: 'Computer Science Seminar', date: new Date(Date.now() + 7 * 24 * 3600 * 1000) }
  ], skipDuplicates: true });

  const events = await prisma.event.findMany();

  await prisma.eventAttendance.createMany({ data: [
    { eventId: events[0].id, student: 'AP25110010642' }
  ] });

  // SAP sample records
  await prisma.sapRecord.create({ data: { studentId: 'AP25110010642', type: 'withdraw', reason: 'Personal reasons', status: 'pending' } });

  const sapRecords = await prisma.sapRecord.findMany();
  if(sapRecords.length > 0){
    await prisma.sapAttachment.createMany({ data: [
      { sapRecordId: sapRecords[0].id, filename: 'withdrawal_form.pdf', url: null }
    ] });
  }

  // Finance sample data
  await prisma.fee.createMany({ data: [
    { code: 'FEE_HOSTEL', title: 'Hostel Fee', amount: 5000 },
    { code: 'FEE_TUITION', title: 'Tuition Fee', amount: 15000 }
  ], skipDuplicates: true });

  await prisma.payment.create({ data: { studentId: 'AP25110010642', amount: 5000, method: 'online', reference: 'TXN123' } });
  await prisma.financeTransaction.create({ data: { studentId: 'AP25110010642', type: 'payment', amount: 5000, metadata: 'TXN123' } });

  // Examination sample
  await prisma.exam.createMany({ data: [
    { code: 'EXAM_MID_CS101', title: 'Midterm - CS101', date: new Date(Date.now() + 7*24*3600*1000) },
    { code: 'EXAM_END_CS101', title: 'Endterm - CS101', date: new Date(Date.now() + 40*24*3600*1000) }
  ], skipDuplicates: true });

  const exams = await prisma.exam.findMany();
  if(exams.length>0){
    await prisma.result.create({ data: { examId: exams[0].id, studentId: 'AP25110010642', grade: 'A', marks: 92 } });
  }

  // Hostel sample
  await prisma.hostel.createMany({ data: [ { name: 'Boys Hostel' }, { name: 'Girls Hostel' } ], skipDuplicates: true });
  const hostels = await prisma.hostel.findMany();
  if(hostels.length>0){
    await prisma.room.create({ data: { hostelId: hostels[0].id, number: '101', capacity: 2 } });
    await prisma.allocation.create({ data: { roomId: 1, studentId: 'AP25110010642', fromDate: new Date() } });
    await prisma.complaint.create({ data: { studentId: 'AP25110010642', subject: 'Leak', message: 'Pipe leaking in room' } });
  }

  // Transport sample
  await prisma.transportRoute.createMany({ data: [ { name: 'Route A', desc: 'City to Campus' } ], skipDuplicates: true });
  const routes = await prisma.transportRoute.findMany();
  if(routes.length>0){
    await prisma.stop.create({ data: { routeId: routes[0].id, name: 'Stop 1', seq: 1 } });
    await prisma.passRequest.create({ data: { studentId: 'AP25110010642', routeId: routes[0].id } });
  }

  // Feedback & Announcements sample
  await prisma.feedbackTicket.create({ data: { studentId: 'AP25110010642', subject: 'Canteen', message: 'Request more healthy options' } });
  await prisma.announcement.create({ data: { title: 'Semester Break', content: 'College closed next Friday', pinned: true } });

  // Verification sample
  await prisma.verificationRequest.create({ data: { studentId: 'AP25110010642', vtype: 'Conduct Certificate' } });
  const vreqs = await prisma.verificationRequest.findMany();
  if(vreqs.length>0){
    await prisma.verificationAttachment.create({ data: { verificationRequestId: vreqs[0].id, filename: 'id_card.jpg' } });
  }

  console.log('Seed finished');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
