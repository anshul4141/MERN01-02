import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


axios.defaults.withCredentials = true;

const AddUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    loginId: '',
    password: '',
    dob: '',
    gender: '',
    role: ''
  });

  const [errormessage, setErrorMessage] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log('firstName ==>', formData.firstName);
    console.log('lastName ==>', formData.lastName);
    console.log('loginId ==>', formData.loginId);
  };

  useEffect(() => {
    if (id) {

      axios.get(`http://localhost:5000/user/getById/${id}`)
        .then(response => {
          const userData = response.data;
          const formattedDob = new Date(userData.dob).toISOString().split('T')[0];
          setFormData({ ...userData, dob: formattedDob });
        })
        .catch(error => {
          console.log('Error fetching user:', error.message);
        });
    }
  }, [id]);


  const validate = () => {

    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = 'First Name is Required'
    } else if (!isNaN(formData.firstName)) {
      newErrors.firstName = 'First Name Contain only Alphabets'

    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required.';
    } else if (!isNaN(formData.lastName)) {
      newErrors.lastName = 'Last Name Contain only Alphabets'

    }

    if (!formData.loginId) {
      newErrors.loginId = 'Email is required.';
    } else if (!formData.loginId.endsWith('@gmail.com')) {
      newErrors.loginId = 'Formate of loginId is Invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required.';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required.';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required.';
    }

    setErrorMessage(newErrors);
    return Object.keys(newErrors).length === 0;

  }

  const save = (e) => {
    e.preventDefault();

    if (!validate()) {
      return
    }
    const url = id ? `http://localhost:5000/user/update/${id}` : `http://localhost:5000/user/save`;
    axios.post(url, formData)
      .then((response) => {
        setMessage(response.data.error ? response.data.error : response.data.message);
        console.log('response: ', response.data);
      })
      .catch((error) => {
        setMessage('An error occurred.');
        console.error(error);
      });
  };

  return (
    <div>
      <h1 align="center">{id ? 'Update User' : 'Add User'}</h1>
      <form onSubmit={save}>
        {message && (
          <div align="center" style={{ marginTop: '20px', color: message.includes('successfully') ? 'green' : 'red' }}>
            {message}
          </div>
        )}
        <table align="center">
          <tbody>
            <tr>
              <th>FirstName:</th>
              <td>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter Your FirstName" />
              </td>
              {errormessage.firstName && <div style={{ color: 'red' }}>{errormessage.firstName}</div>}
            </tr>
            <tr>
              <th>LastName:</th>
              <td>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter Your LastName" />
              </td>
              {errormessage.lastName && <div style={{ color: 'red' }}>{errormessage.lastName}</div>}
            </tr>
            <tr>
              <th>LoginId:</th>
              <td>
                <input type="email" name="loginId" value={formData.loginId} onChange={handleChange} placeholder="Enter Your EmailId" />
              </td>
              {errormessage.loginId && <div style={{ color: 'red' }}>{errormessage.loginId}</div>}
            </tr>
            <tr>
              <th>Password:</th>
              <td>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Your Password" />
              </td>
              {errormessage.password && <div style={{ color: 'red' }}>{errormessage.password}</div>}
            </tr>
            <tr>
              <th>DOB:</th>
              <td>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Enter Your Dob" />
              </td>
              {errormessage.dob && <div style={{ color: 'red' }}>{errormessage.dob}</div>}
            </tr>
            <tr>
              <th>Gender:</th>
              <td>
                <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Enter Your Gender" />
              </td>
              {errormessage.gender && <div style={{ color: 'red' }}>{errormessage.gender}</div>}
            </tr>
            <tr>
              <th>Role:</th>
              <td>
                <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Enter Your role" />
              </td>
              {errormessage.role && <div style={{ color: 'red' }}>{errormessage.role}</div>}
            </tr>
            <tr>
              <th></th>
              <td>
                <input type="submit" value={id ? 'update' : 'save'} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddUser;
