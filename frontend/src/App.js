import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Welcome from './component/Welcome';
import SignUp from './component/Auth/SignUp';
import Login from './component/Auth/Login';
import AddUser from './component/User/AddUser';
import UserList from './component/User/UserList';
import AddStudent from './component/Student/AddStudent';
import StudentList from './component/Student/StudentList';
import AddMarksheet from './component/Marksheet/AddMarksheet';
import MarksheetList from './component/Marksheet/MarksheetList';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/addUser' element={<AddUser />} />
          <Route path="/userList" element={<UserList />} />
          <Route path='/addStudent' element={<AddStudent />} />
          <Route path='/edituser/:id' element={<AddUser />} />
          <Route path="/studentList" element={<StudentList />} />
          <Route path='/addMarksheet' element={<AddMarksheet />} />
          <Route path="/marksheetList" element={<MarksheetList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
