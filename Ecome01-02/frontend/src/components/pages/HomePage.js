import React, { useState, useEffect } from "react";
import Layout from './../Layouts/Layout'
import { useAuth } from '../../context/auth'
import axios from "axios";

const HomePage = () => {
    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const cardImageStyle = {
        height: "200px",
        objectFit: "contain",
        backgroundColor: "#f8f8f8",
        padding: "10px",
    };

    const filterSectionStyle = {
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "15px",
        background: "linear-gradient(to bottom, #333, #000)",
        marginBottom: "15px",
        minHeight: "200px",
        textAlign: "left",
        width: "90%",
        color: "#fff",
    };

    const filterHeaderStyle = {
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: "10px",
    };

    const checkboxContainerStyle = {
        display: "flex",
        alignItems: "center",
        marginLeft: "0",
    };

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/product/get-product`);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])

    return (
        <Layout>
            <div className="row mt-3">
                <div className="col-md-3">
                    <h4 className="text-center">Filter By Category</h4>
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Product</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <div className="card m-2" key={p._id}>
                                <img
                                    src={`http://localhost:5000/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    style={cardImageStyle}
                                />
                                <div className="card-body">
                                    <div className="card-name-price">
                                        <h6 className="card-title">{p.name}</h6>
                                        <span className="card-title">
                                            <span className="a-price-symbol">₹</span>
                                            <span className="a-price-whole">{p.price}</span>
                                        </span>
                                    </div>
                                    <p className="card-text">{p.description}</p>
                                    <div className="card-name-price">
                                        <button className="btn btn-primary ms-1" >
                                            More Details
                                        </button>
                                        <button
                                            className="btn btn-secondary ms-1">
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage
