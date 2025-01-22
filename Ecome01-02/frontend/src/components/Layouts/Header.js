import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
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
                                    className="nav-link active text-white"
                                    aria-current="page"
                                >
                                    Home
                                </NavLink>
                            </li>
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
