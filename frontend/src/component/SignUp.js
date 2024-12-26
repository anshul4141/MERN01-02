import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    loginId: '',
    password: '',
    dob: '',
    gender: '',
    address: '',
    role: 'user'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log('firstName ==>', formData.firstName);
    console.log('lastName ==>', formData.lastName);
    console.log('loginId ==>', formData.loginId);
  };

  const SignUp = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/user/signUp', formData)
      .then((response) => {
        setMessage('User registered successfully!');
        console.log(response.data);
      })
      .catch((error) => {
        setMessage('An error occurred.');
        console.error(error);
      });
  };

  return (
    <div>
      <h1 align="center">User Registration</h1>
      <form onSubmit={SignUp}>
        {message && (
          <div align="center" style={{ marginTop: '20px', color: message.includes('successfully') ? 'green' : 'red' }}>
            {message}
          </div>
        )}
        <table align="center">
          <tr>
            <th>FirstName:</th>
            <td>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter Your FirstName" />
            </td>
          </tr>
          <tr>
            <th>LastName:</th>
            <td>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter Your LastName" />
            </td>
          </tr>
          <tr>
            <th>LoginId:</th>
            <td>
              <input type="email" name="loginId" value={formData.loginId} onChange={handleChange} placeholder="Enter Your EmailId" />
            </td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Your Password" />
            </td>
          </tr>
          <tr>
            <th>DOB:</th>
            <td>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Enter Your Dob" />
            </td>
          </tr>
          <tr>
            <th>Gender:</th>
            <td>
              <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Enter Your Gender" />
            </td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Your Address" />
            </td>
          </tr>
          <tr>
            <th></th>
            <td>
              <input type="submit" value="SignUp" />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default SignUp;
