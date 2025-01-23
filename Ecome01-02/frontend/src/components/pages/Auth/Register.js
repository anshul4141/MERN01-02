import React, { useState } from "react";
import Layout from "../../Layouts/Layout.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "../../../styles/AuthStyles.css"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        answer: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const signUp = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`http://localhost:5000/auth/signUp`, formData);

            console.log("data ===>", res.data);

            if (res.data.success) {
                toast.success("User Registration Successfully. Please Login");
            } else {
                toast.error(res.data.message || "Registration failed");
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <Layout>
            <Toaster position="top-center" reverseOrder={false} />
            <div className='form-container'>
                <h1>User Registration</h1>
                <form onSubmit={signUp}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className='form-control'
                            placeholder='Enter your Name'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className='form-control'
                            placeholder='Enter your Email'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='form-control'
                            placeholder='Enter your Password'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className='form-control'
                            placeholder='Enter your Phone'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className='form-control'
                            placeholder='Enter your Address'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="answer"
                            value={formData.answer}
                            onChange={handleChange}
                            className='form-control'
                            placeholder='What is Your Favorite sport?'
                        />
                    </div>
                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary">SignUp</button>
                        <Link to="/login" className="btn btn-secondary">SignIn</Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Register;