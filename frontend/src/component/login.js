import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [FormData, setLoginData] = useState({
    loginId: '',
    password: ''
  });

  const [errormessage, setErrorMessage] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...FormData, [name]: value });
  };

  const validate = () => {

    const newErrors = {};

    if (!FormData.loginId) {
      newErrors.loginId = 'Email is required.';
    } else if (!FormData.loginId.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")) {
      newErrors.loginId = 'Formate of loginId is Invalid';
    }

    if (!FormData.password) {
      newErrors.password = 'Password is required.';
    }

    setErrorMessage(newErrors);
    return Object.keys(newErrors).length === 0;

  }

  const login = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    axios.post('http://localhost:5000/user/login', FormData)
      .then((response) => {
        const user = response.data.user;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          setMessage('Login successful!');
          navigate('/welcome');
        }
      })
      .catch((error) => {
        setMessage('Invalid login credentials.');
      });
  };

  return (
    <div>
      <h1 align="center">User Login</h1>
      <form onSubmit={login}>
        {message && (
          <div align="center" style={{ marginTop: '20px', color: message.includes('successful') ? 'green' : 'red' }}>
            {message}
          </div>
        )}
        <table align="center">
          <tr>
            <th>Email:</th>
            <td>
              <input type="email" name="loginId" value={FormData.loginId} onChange={handleChange} placeholder="Enter Your Email" />
              {errormessage.loginId && <div style={{ color: 'red' }}>{errormessage.loginId}</div>}
            </td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>
              <input type="password" name="password" value={FormData.password} onChange={handleChange} placeholder="Enter Your Password" />
              {errormessage.password && <div style={{ color: 'red' }}>{errormessage.password}</div>}
            </td>
          </tr>
          <tr>
            <th></th>
            <td>
              <input type="submit" value="Login" />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default Login;