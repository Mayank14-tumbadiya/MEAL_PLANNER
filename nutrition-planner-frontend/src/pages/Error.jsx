import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error-container" style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Oops! Something went wrong</h1>
      <p>We encountered an error while processing your request.</p>
      <div className="error-actions" style={{ marginTop: "1rem" }}>
        <Link to="/login" style={{ 
          backgroundColor: "#4CAF50", 
          color: "white", 
          padding: "10px 15px",
          textDecoration: "none",
          borderRadius: "4px"
        }}>
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default Error;