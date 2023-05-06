import React from "react";
import { Link } from "react-router-dom";
import useDocTitle from "../hooks/useDocTitle";

const error_page = "/assets/error-page.png";

const ErrorPage = () => {
  useDocTitle('Có lỗi xảy ra')
  return (
    <>
      <section id="error_page" className="section">
        <div className="container">
          <div className="error_page_content">
            <img src={error_page} alt="404 Not Found"></img>
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
