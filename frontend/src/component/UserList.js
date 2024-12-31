import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/user/search')
            .then(response => {
                console.log('data ===>', response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.log('Error fetching users:', error.message);
            });
    }, []);

    return (
        <form>
            <table align='center' border={1} width='100%'>
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
                        <tr key={user._id} align='center'>
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
        </form>
    )
}

export default UserList
