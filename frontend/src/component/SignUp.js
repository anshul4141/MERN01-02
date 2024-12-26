import React, { useState } from 'react';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log('firstName===>', formData.firstName);
    console.log('lastName===>', formData.lastName);
    console.log('logindId===>', formData.loginId);

  };


  return (
    <div>
      <h1 align='center'>User Registration</h1>
      <form>
        <table align='center'>
          <tr>
            <th>FirstName:</th>
            <td><input type='text' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='Enter First Name' /></td>
          </tr>
          <tr>
            <th>LastName:</th>
            <td><input type='text' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Enter Last Name' /></td>
          </tr>
          <tr>
            <th>LoginId:</th>
            <td><input type='email' name='loginId' value={formData.loginId} onChange={handleChange} placeholder='Enter EmailId' /></td>
          </tr>
          <tr>
            <th>Password:</th>
            <td><input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Enter Password' /></td>
          </tr>
          <tr>
            <th>DOB:</th>
            <td><input type='date' name='dob' value={formData.dob} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Gender:</th>
            <td><input type='text' name='gender' value={formData.gender} onChange={handleChange} placeholder='Enter Your Gender' /></td>
          </tr>
          <tr>
            <th></th>
            <td><input type='submit' value='SignUp' /></td>
          </tr>
        </table>
      </form>
    </div>
  )
}

export default SignUp
