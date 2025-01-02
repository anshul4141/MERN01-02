import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AddMarksheet = () => {
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        physics: '',
        chemistry: '',
        maths: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const save = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/marksheet/save', formData)
            .then((response) => {
                setMessage(response.data.error ? response.data.error : 'Marksheet added successfully');
                console.log(response.data);
            })
            .catch((error) => {
                setMessage('An error occurred.');
                console.error(error);
            });
    };

    return (
        <div>
            <h1 align="center">Add Marksheet</h1>
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
                            <th>RollNo:</th>
                            <td>
                                <input type="number" name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="Enter RollNo" />
                            </td>
                        </tr>
                        <tr>
                            <th>Physics:</th>
                            <td>
                                <input type="number" name="physics" value={formData.physics} onChange={handleChange} placeholder="Enter phy marks" />
                            </td>
                        </tr>
                        <tr>
                            <th>Chemistry:</th>
                            <td>
                                <input type="number" name="chemistry" value={formData.chemistry} onChange={handleChange} placeholder="Enter chemistry marksh" />
                            </td>
                        </tr>
                        <tr>
                            <th>Maths:</th>
                            <td>
                                <input type="number" name="maths" value={formData.maths} onChange={handleChange} placeholder="Enter maths marks" />
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


export default AddMarksheet
