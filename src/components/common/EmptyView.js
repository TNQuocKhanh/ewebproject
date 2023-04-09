import React from "react";
import { Link } from "react-router-dom";

const EmptyView = (props) => {
  const { icon, msg, link, btnText } = props;

  return (
    <>
      <div className="empty_view_wrapper">
        <div className="empty_view_icon" style={{textAlign: 'center'}}>
          <img src="https://www.espressoclubegypt.com/resources/assets/front/images/cartempty.png" alt="empty-cart"></img>
        </div>
        <p>{msg}</p>
        {link && (
          <Link to={link} className="btn">
            {btnText}
          </Link>
        )}
      </div>
    </>
  );
};

export default EmptyView;
