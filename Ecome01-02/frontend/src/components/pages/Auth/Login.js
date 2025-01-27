import React, { useState } from "react";
import Layout from "../../Layouts/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "../../../styles/AuthStyles.css";
import { useAuth } from "../../../context/auth";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`http://localhost:5000/auth/login`, formData);

            if (res.data.success) {
                toast.success("User login Successfully");
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate("/");
            } else {
                toast.error(res.data.message || "Login failed");
            }
        } catch (error) {
            console.log(error);
            toast.error("Invalid loginId or Password");
        }
    };

    return (
        <Layout>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your Email"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your Password"
                        />
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary">
                            SignIn
                        </button>
                        <Link to="/register" className="btn btn-secondary">
                            SignUp
                        </Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
