import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [loginData, setLoginData] = useState({
    loginId: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const login = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/user/login', loginData)
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
              <input type="email" name="loginId" value={loginData.loginId} onChange={handleChange} placeholder="Enter Your Email"
              />
            </td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>
              <input type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Enter Your Password" />
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