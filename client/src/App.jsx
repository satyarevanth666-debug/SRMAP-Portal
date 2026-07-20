import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AcademicSubjects from './pages/AcademicSubjects';
import Timetable from './pages/Timetable';
import AttendanceDetails from './pages/AttendanceDetails';
import CourseRegistration from './pages/CourseRegistration';
import Events from './pages/Events';
import Withdraw from './pages/Withdraw';
import SAPDetails from './pages/SAPDetails';
import SAPAttachments from './pages/SAPAttachments';
import SAPFeedback from './pages/SAPFeedback';
import FinanceOverview from './pages/FinanceOverview';
import Transactions from './pages/Transactions';
import Payments from './pages/Payments';
import Fees from './pages/Fees';
import ExaminationInternalMarks from './pages/ExaminationInternalMarks';
import ExaminationPreviousInternalMarks from './pages/ExaminationPreviousInternalMarks';
import ExaminationCurrentResults from './pages/ExaminationCurrentResults';
import ExaminationMarkDetails from './pages/ExaminationMarkDetails';
import ExaminationRegistration from './pages/ExaminationRegistration';
import ExaminationRegistrationDetails from './pages/ExaminationRegistrationDetails';
import ExaminationDegreePhotoUpload from './pages/ExaminationDegreePhotoUpload';
import HostelBooking from './pages/HostelBooking';
import HostelRoomDetails from './pages/HostelRoomDetails';
import HostelRefundPolicy from './pages/HostelRefundPolicy';
import HostelRules from './pages/HostelRules';
import TransportRegistration from './pages/TransportRegistration';
import TransportAcknowledgment from './pages/TransportAcknowledgment';
import TransportRefundPolicy from './pages/TransportRefundPolicy';
import EndSemesterFeedback from './pages/EndSemesterFeedback';
import AnnouncementsList from './pages/AnnouncementsList';
import AnnouncementDetails from './pages/AnnouncementDetails';
import VerificationStudent from './pages/VerificationStudent';
import VerificationCertificates from './pages/VerificationCertificates';
import VerificationBonafide from './pages/VerificationBonafide';
import VerificationIDCard from './pages/VerificationIDCard';

export default function App(){
  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/academic/subjects" style={{ marginRight: 12 }}>Subjects</Link>
        <Link to="/academic/timetable" style={{ marginRight: 12 }}>Timetable</Link>
        <Link to="/academic/attendance" style={{ marginRight: 12 }}>Attendance</Link>
        <Link to="/academic/course-registration" style={{ marginRight: 12 }}>Course Reg</Link>
        <Link to="/events" style={{ marginRight: 12 }}>Events</Link>
        <Link to="/sap/process" style={{ marginRight: 12 }}>SAP</Link>
        <Link to="/finance" style={{ marginRight: 12 }}>Finance</Link>
        <Link to="/examination/internal-marks" style={{ marginRight: 12 }}>Exams</Link>
        <Link to="/hostel/booking" style={{ marginRight: 12 }}>Hostel</Link>
        <Link to="/transport/register" style={{ marginRight: 12 }}>Transport</Link>
        <Link to="/feedback/end-semester" style={{ marginRight: 12 }}>Feedback</Link>
        <Link to="/announcements" style={{ marginRight: 12 }}>Announcements</Link>
        <Link to="/verification/student" style={{ marginRight: 12 }}>Verification</Link>
      </nav>
      <Routes>
        <Route path="/academic/subjects" element={<AcademicSubjects/>} />
        <Route path="/academic/timetable" element={<Timetable/>} />
        <Route path="/academic/attendance" element={<AttendanceDetails/>} />
        <Route path="/academic/course-registration" element={<CourseRegistration/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="/sap/process" element={<SAPDetails/>} />
        <Route path="/sap/withdraw" element={<Withdraw/>} />
        <Route path="/sap/attachments" element={<SAPAttachments/>} />
        <Route path="/sap/feedback" element={<SAPFeedback/>} />
        <Route path="/finance" element={<FinanceOverview/>} />
        <Route path="/finance/transactions" element={<Transactions/>} />
        <Route path="/finance/payments" element={<Payments/>} />
        <Route path="/finance/fees" element={<Fees/>} />
        <Route path="/examination/internal-marks" element={<ExaminationInternalMarks/>} />
        <Route path="/examination/previous-internal-marks" element={<ExaminationPreviousInternalMarks/>} />
        <Route path="/examination/current-results" element={<ExaminationCurrentResults/>} />
        <Route path="/examination/mark-details" element={<ExaminationMarkDetails/>} />
        <Route path="/examination/register" element={<ExaminationRegistration/>} />
        <Route path="/examination/registration-details" element={<ExaminationRegistrationDetails/>} />
        <Route path="/examination/degree-photo" element={<ExaminationDegreePhotoUpload/>} />
        <Route path="/hostel/booking" element={<HostelBooking/>} />
        <Route path="/hostel/room" element={<HostelRoomDetails/>} />
        <Route path="/hostel/refund-policy" element={<HostelRefundPolicy/>} />
        <Route path="/hostel/rules" element={<HostelRules/>} />
        <Route path="/transport/register" element={<TransportRegistration/>} />
        <Route path="/transport/acknowledgment" element={<TransportAcknowledgment/>} />
        <Route path="/transport/refund-policy" element={<TransportRefundPolicy/>} />
        <Route path="/feedback/end-semester" element={<EndSemesterFeedback/>} />
        <Route path="/announcements" element={<AnnouncementsList/>} />
        <Route path="/announcements/:id" element={<AnnouncementDetails/>} />
        <Route path="/verification/student" element={<VerificationStudent/>} />
        <Route path="/verification/certificates" element={<VerificationCertificates/>} />
        <Route path="/verification/bonafide" element={<VerificationBonafide/>} />
        <Route path="/verification/id-card" element={<VerificationIDCard/>} />
        <Route path="/" element={<div>Select a page from above</div>} />
      </Routes>
    </div>
  );
}
