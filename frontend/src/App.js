import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Welcome from './component/Welcome';
import SignUp from './component/SignUp';
import Login from './component/Login';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <br></br>
          &nbsp;&nbsp;
          <Link to="/">Welcome</Link> |&nbsp;
          <Link to="/login">Login</Link> |&nbsp;
          <Link to="/signup">SignUp</Link>
          <br></br>
          <hr></hr>
        </nav>

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
