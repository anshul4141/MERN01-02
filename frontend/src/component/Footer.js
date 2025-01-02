import React from "react";

const Footer = () => {
    const footerStyle = {
        position: "fixed",
        left: 0,
        width: "100%",
        bottom: 0,
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
    };

    return (
        <div style={footerStyle}>
            <hr />
            <h3>&copy; Copyrights RAYS Technologies</h3>
        </div>
    );
};

export default Footer;
