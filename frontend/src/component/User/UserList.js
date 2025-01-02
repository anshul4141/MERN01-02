import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/user/search')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log('Error fetching users:', error.message);
            });
    }, []);

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
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr align='center' key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.loginId}</td>
                            <td>{user.dob}</td>
                            <td>{user.gender}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;