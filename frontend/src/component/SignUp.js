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
    role: 'user'
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user starts typing
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }

    if (!formData.loginId.trim()) {
      newErrors.loginId = 'Email is required.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required.';
    }

    if (!formData.gender.trim()) {
      newErrors.gender = 'Gender is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

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
      <h1 align='center'>User Registration</h1>
      <form onSubmit={handleSignUp}>
        {message && (
          <div align="center" style={{ marginTop: '20px', color: message.includes('successfully') ? 'green' : 'red' }}>
            {message}
          </div>
        )}
        <table align='center'>
          <tbody>
            <tr>
              <th>FirstName:</th>
              <td>
                <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='Enter First Name' />
                {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
              </td>
            </tr>
            <tr>
              <th>LastName:</th>
              <td>
                <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Enter Last Name' />
                {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
              </td>
            </tr>
            <tr>
              <th>LoginId:</th>
              <td>
                <input type='email' name='loginId' value={formData.loginId} onChange={handleChange} placeholder='Enter EmailId' />
                {errors.loginId && <div style={{ color: 'red' }}>{errors.loginId}</div>}
              </td>
            </tr>
            <tr>
              <th>Password:</th>
              <td>
                <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Enter Password' />
                {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
              </td>
            </tr>
            <tr>
              <th>DOB:</th>
              <td>
                <input type='date' name='dob' value={formData.dob} onChange={handleChange} />
                {errors.dob && <div style={{ color: 'red' }}>{errors.dob}</div>}
              </td>
            </tr>
            <tr>
              <th>Gender:</th>
              <td>
                <input type='text' name='gender' value={formData.gender} onChange={handleChange} placeholder='Enter Your Gender' />
                {errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}
              </td>
            </tr>
            <tr>
              <th></th>
              <td>
                <input type='submit' value='SignUp' />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default SignUp;