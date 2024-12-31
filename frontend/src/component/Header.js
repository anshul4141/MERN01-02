import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user');
        console.log("user logout successfully...");
        navigate('/login');
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
