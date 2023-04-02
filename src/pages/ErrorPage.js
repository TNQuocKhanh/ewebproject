import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <section id="error_page" className="section">
        <div className="container">
          <div className="error_page_content">
            <img
              src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1680333923~exp=1680334523~hmac=3d8fc2d434a4d2a260a374e7797dd467a048ce27488e7f2d14b33496c74c0e10"
              alt="404 Not Found"
            ></img>
            <h3>Sorry, the requested page was not found.</h3>
            <Link to="/" className="btn">
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
