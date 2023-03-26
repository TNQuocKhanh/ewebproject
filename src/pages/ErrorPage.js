import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <section id="error_page" className="section">
        <div className="container">
          <div className="error_page_content">
            <img src="https://res.cloudinary.com/dkikircxr/image/upload/v1679761931/KLTN-ElectricShop/vecteezy_404-landing-page_6549647_m8rc0w.jpg" alt="404 Not Found"></img>
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
