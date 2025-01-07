import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

const StudentList = () => {
    const [student, setStudent] = useState([]);

    useEffect(() => {
        fetchStudent();
    }, []);

    const fetchStudent = () => {
        axios.get('http://localhost:5000/student/search')
            .then(response => {
                setStudent(response.data);
            })
            .catch(error => {
                console.log('Error fetching users:', error.message);
            });
    };

    const deleteStudent = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            axios.post(`http://localhost:5000/student/delete/${id}`)
                .then(() => {
                    alert('Student deleted successfully');
                    fetchStudent(); // Refresh the student list
                })
                .catch(error => {
                    console.log('Error deleting student:', error.message);
                    alert('Failed to delete the user. Please try again.');
                });
        }
    };

    return (
        <div>
            <h2 align='center'>Student List</h2>
            <table align='center' border="1" width='100%'>
                <thead>
                    <tr style={{ backgroundColor: 'skyblue' }}>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>School</th>
                        <th>DOB</th>
                        <th>MobileNo</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {student.map((student) => (
                        <tr align='center' key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.subject}</td>
                            <td>{student.school}</td>
                            <td>{new Date(student.dob).toLocaleDateString()}</td>
                            <td>{student.mobileNo}</td>
                            <td>{student.gender}</td>
                            <td>
                                <Link to={`/editStudent/${student._id}`}> <button>Edit</button> </Link>
                                <button onClick={() => deleteStudent(student._id)} > Delete </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList
