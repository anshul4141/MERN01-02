import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AddStudent = () => {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        school: '',
        dob: '',
        mobileNo: '',
        gender: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };


    const save = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/student/save', formData)
            .then((response) => {
                setMessage(response.data.error ? response.data.error : 'Data Added successfully');
                console.log('response: ', response.data);
            })
            .catch((error) => {
                setMessage('An error occurred.');
                console.error(error);
            });
    };

    return (
        <div>
            <h1 align="center">Add Student</h1>
            <form onSubmit={save}>
                {message && (
                    <div align="center" style={{ marginTop: '20px', color: message.includes('successfully') ? 'green' : 'red' }}>
                        {message}
                    </div>
                )}
                <table align="center">
                    <tbody>
                        <tr>
                            <th>Name:</th>
                            <td>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Your Name" />
                            </td>
                        </tr>
                        <tr>
                            <th>Subject:</th>
                            <td>
                                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Enter Your School" />
                            </td>
                        </tr>
                        <tr>
                            <th>School:</th>
                            <td>
                                <input type="text" name="school" value={formData.school} onChange={handleChange} placeholder="Enter Your School" />
                            </td>
                        </tr>
                        <tr>
                            <th>DOB:</th>
                            <td>
                                <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Enter Your Dob" />
                            </td>
                        </tr>
                        <tr>
                            <th>MobileNo:</th>
                            <td>
                                <input type="number" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="Enter Your MobileNo" />
                            </td>
                        </tr>
                        <tr>
                            <th>Gender:</th>
                            <td>
                                <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Enter Your Gender" />
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td>
                                <input type="submit" value="save" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default AddStudent
