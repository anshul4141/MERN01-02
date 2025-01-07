import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

const MarksheetList = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [marksheets, setMarksheets] = useState([]);

    useEffect(() => {
        fetchMarksheets();
    }, []);

    const fetchMarksheets = () => {
        axios.get('http://localhost:5000/marksheet/search')
            .then(response => {
                setMarksheets(response.data);
            })
            .catch(error => {
                console.log('Error fetching users:', error.message);
            });
    };

    const deleteMarksheet = (id) => {
        if (window.confirm('Are you sure you want to delete this marksheet?')) {
            axios.post(`http://localhost:5000/marksheet/delete/${id}`)
                .then(() => {
                    alert('Marksheet deleted successfully');
                    fetchMarksheets(); // Refresh the user list
                })
                .catch(error => {
                    console.log('Error deleting marksheet:', error.message);
                    alert('Failed to delete the marksheet. Please try again.');
                });
        }
    };

    return (
        <div>
            <h2 align='center'>Marksheet List</h2>
            <table align='center' border="1" width='100%'>
                <thead>
                    <tr style={{ backgroundColor: 'skyblue' }}>
                        <th>Name</th>
                        <th>RollNo</th>
                        <th>Physics</th>
                        <th>Chemistry</th>
                        <th>Maths</th>
                        {user.user.role == 'Admin' ? (
                            <th>Action</th>
                        ):(
                            ''
                        )}

                    </tr>
                </thead>
                <tbody>
                    {marksheets.map((marksheet) => (
                        <tr align='center' key={marksheet._id}>
                            <td>{marksheet.name}</td>
                            <td>{marksheet.rollNo}</td>
                            <td>{marksheet.physics}</td>
                            <td>{marksheet.chemistry}</td>
                            <td>{marksheet.maths}</td>
                            {user.user.role === 'Admin' ? (
                                <td>
                                    <Link to={`/editmarksheet/${marksheet._id}`}> <button>Edit</button> </Link>
                                    <button onClick={() => deleteMarksheet(marksheet._id)}>Delete</button>
                                </td>
                            ) : (
                                ''
                            )}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MarksheetList
