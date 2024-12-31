import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Welcome from './component/Welcome';
import SignUp from './component/SignUp';
import Login from './component/Login';
import UserList from './component/UserList';
import AddUser from './component/AddUser';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userList" element={<UserList />}></Route>
          <Route path="/addUser" element={<AddUser />}></Route>

        </Routes>
      </div>
    </Router>
  );
};

export default App;
