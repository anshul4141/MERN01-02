import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from "react-hot-toast";

const Header = () => {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({ ...auth, user: null, token: '' });
        localStorage.removeItem('auth');
        toast.success('Logout Successfully');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg"
                style={{
                    background: 'linear-gradient(to right, #000428, #004e92)',
                    color: '#fff',
                }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <NavLink to="/" className="navbar-brand text-white">
                            Ecommerce App
                        </NavLink>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className="nav-link text-white"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/category"
                                    className="nav-link text-white"
                                >
                                    Category
                                </NavLink>
                            </li>
                            {
                                !auth.user ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/register" className="nav-link text-white">
                                                Register
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="nav-link text-white">
                                                Login
                                            </NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item dropdown">
                                        <NavLink
                                            className="nav-link dropdown-toggle text-white"
                                            to="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                        >
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink
                                                    to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                                                    className="dropdown-item"
                                                >
                                                    <i className="fas fa-tachometer-alt"></i> Dashboard
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink onClick={handleLogout} to="/login" className="dropdown-item">
                                                    <i className="fas fa-sign-out-alt"></i> Logout
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                )
                            }
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link text-white">
                                    Cart (0)
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
