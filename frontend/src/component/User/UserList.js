import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


axios.defaults.withCredentials = true;

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:5000/user/search')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log('Error fetching users:', error.message);
            });
    };

    const deleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            axios.post(`http://localhost:5000/user/delete/${id}`)
                .then(() => {
                    alert('User deleted successfully');
                    fetchUsers(); // Refresh the user list
                })
                .catch(error => {
                    console.log('Error deleting user:', error.message);
                    alert('Failed to delete the user. Please try again.');
                });
        }
    }

    return (
        <div>
            <h2 align='center'>User List</h2>
            <table align='center' border="1" width='100%'>
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>LoginId</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr align='center' key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.loginId}</td>
                            <td>{new Date(user.dob).toLocaleDateString()}</td>
                            <td>{user.gender}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/edituser/${user._id}`}><button>Edit</button></Link>
                                <button onClick={() => deleteUser(user._id)} > Delete </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;