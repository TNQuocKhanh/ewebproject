import React from "react";
import { IoMdStar } from "react-icons/io";

const ProductReviews = (props) => {
  const { name, date, review, rateCount } = props;

  return (
    <>
      <li>
        <div className="user_info">
          <img
            style={{ width: '50px', height: '50px' }}
            src="https://galaxylands.com.vn/wp-content/uploads/2022/10/tieu-su-ca-si-mono-17.jpg"
            alt="user-img"
          />
          <div>
            <div style={{ marginLeft: '5px' }}>
              <h5 style={{ marginBottom: '5px' }}>{name}</h5>
              <small>01-04-2023</small>
            </div>
          </div>
        </div>
        <div style={{margin: '10px 0', display: 'flex', alignItems: 'center'}} className="user_ratings">
          <span className="rating_star" style={{marginRight: '10px'}}>
            {[...Array(rateCount)].map((_, i) => (
              <IoMdStar style={{ color: 'var(--main-color)' }} key={i} />
            ))}
          </span>
          <small className="date">2 giờ trước</small>
        </div>
        <p className="user_review">{review}</p>
      </li>
    </>
  );
};

export default ProductReviews;
