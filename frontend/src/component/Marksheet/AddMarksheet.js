import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

axios.defaults.withCredentials = true;

const AddMarksheet = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        physics: '',
        chemistry: '',
        maths: ''
    });

    const [message, setMessage] = useState('');
    const [studentName, setStudentName] = useState([]);
    console.log('studentName ===> ', studentName);

    useEffect(() => {

        axios.get('http://localhost:5000/student/search')
            .then((response) => {
                setStudentName(response.data.map(student => student.name));
                console.log('respone ===> ', response.data);
            })
            .catch((error) => {
                setMessage('An error occurred.');
                console.error(error);
            });

        if (id) {
            axios.get(`http://localhost:5000/marksheet/getMarksheetById/${id}`)
                .then((response) => {
                    setFormData(response.data);
                    console.log('respone ===> ', response.data);
                })
                .catch((error) => {
                    setMessage('An error occurred.');
                    console.error(error);
                });
        }

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log('student ===>>> ', formData.name);
    };

    const save = (e) => {
        e.preventDefault();
        const url = id ? `http://localhost:5000/marksheet/update/${id}` : `http://localhost:5000/marksheet/save`;
        axios.post(url, formData)
            .then((response) => {
                setMessage(response.data.error ? response.data.error : response.data.message);
                console.log(response.data);
            })
            .catch((error) => {
                setMessage('An error occurred.');
                console.error(error);
            });
    };

    return (
        <div>
            <h1 align="center">{id ? 'Update Marksheet' : 'Add Marksheet'}</h1>
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
                                <select name="name" value={formData.name} onChange={handleChange}>
                                    <option value="">--------Select Name-------</option>
                                    {studentName.map((name, index) => (
                                        <option key={index} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
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
                                <input type="submit" value={id ? 'Update' : 'Save'} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};


export default AddMarksheet