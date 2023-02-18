import { Routes, Route } from "react-router-dom";
import Register from "../component/private/register";
import SearchUsers from "../component/private/searchUsers";
import UpdateStudent from "../component/private/updateStudent";
import DeleteStudent from "../component/private/deleteStudent";
import LogIn from "../component/public/login";
import HeaderLayout from "../component/private/headerLayout";
import DashBoard from "../component/private/dashBoard";
import ExamSection from "../component/public/examSection/examSection";
import English from "../component/public/examSection/subjects/english";
import Maths from "../component/public/examSection/subjects/maths";
import Chemistry from "../component/public/examSection/subjects/chemistry";
import Physics from "../component/public/examSection/subjects/physics";
import Biology from "../component/public/examSection/subjects/biology";
import SubmittedExam from "../component/public/submittedExam";
import DefaultPage from "../component/public/defaultPage";
import RegisterAdmin from "../component/private/registerAdmin";
import Result from "../component/private/result";
import Admin from "../component/private/admin";
import Home from "../component/public/Home";
import TimeUp from "../component/public/timeUp";

const Pages = () => {
  return (
    <Routes>
      {/* Public Section */}
      <Route path="/" element={<Home />} />
      <Route path="login" element={<LogIn />} />
      <Route path="timeUp" element={<TimeUp />} />

      {/* Components with Header */}
      <Route path="examSection" element={<ExamSection />}>
        <Route index element={<DefaultPage />} />
        <Route path="english" element={<English />} />
        <Route path="maths" element={<Maths />} />
        <Route path="chemistry" element={<Chemistry />} />
        <Route path="physics" element={<Physics />} />
        <Route path="biology" element={<Biology />} />
        <Route path="submittedExam" element={<SubmittedExam />} />
      </Route>
      {/* Private Section */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/adminSection" element={<HeaderLayout />}>
        <Route index element={<DashBoard />} />
        <Route path="registerAdmin" element={<RegisterAdmin />} />
        <Route path="result" element={<Result />} />
        <Route path="register" element={<Register />} />
        <Route path="searchUsers" element={<SearchUsers />} />
        <Route path="updateStudent/:id" element={<UpdateStudent />} />
        <Route path="deleteStudent/:id" element={<DeleteStudent />} />
      </Route>
    </Routes>
  );
};

export default Pages;
