import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const logout = () => {
        axios.post('http://localhost:5000/user/logout')
            .then(response => {
                localStorage.removeItem('user');
                console.log('data ==> ', response.data);
                navigate('/login');
            })
            .catch(error => {
                console.log('Error fetching users:', error.message);
            });

    };

    return (
        <nav>
            <div>
                {user ? (
                    <div>
                        <h3>&nbsp; Hi, {user.user.firstName}</h3>
                        <Link to="/">Welcome</Link> |&nbsp;
                        <Link to="/addUser">Add User</Link> |&nbsp;
                        <Link to="/userList">User List</Link> |&nbsp;
                        <Link to="/addStudent">Add Student</Link> |&nbsp;
                        <Link to="/studentList">Student List</Link> |&nbsp;
                        <Link to="/addMarksheet">Add Marksheet</Link> |&nbsp;
                        <Link to="/marksheetList">Marksheet List</Link> |&nbsp;
                        <Link to="#" onClick={logout}>
                            Logout
                        </Link>
                    </div>
                ) : (
                    <div>
                        <h3>&nbsp; Hi, guest</h3>
                        <Link to="/">Welcome</Link> |&nbsp;
                        <Link to="/login">Login</Link> |&nbsp;
                        <Link to="/signup">SignUp</Link>
                    </div>
                )}
            </div>
            <br></br>
            <hr></hr>
        </nav>
    );
};

export default Header;
