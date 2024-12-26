import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Welcome from './component/Welcome';
import SignUp from './component/SignUp';
import Login from './component/Login';

const Navigation = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('user ===> ', user);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav>
      {user ? (
        <>
          <h3>&nbsp; Hi, {user.user.firstName}</h3>
          <Link to="/">Welcome</Link> |&nbsp;
          <Link to="#" onClick={logout}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <h3>&nbsp; Hi, guest</h3>
          <Link to="/">Welcome</Link> |&nbsp;
          <Link to="/login">Login</Link> |&nbsp;
          <Link to="/signup">SignUp</Link>
        </>
      )}
      <br></br>
      <hr></hr>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;