import React from "react";
import { IoMdStar } from "react-icons/io";
import { formatDateTime } from "../../utils";

const ProductReviews = (props) => {
  const { customerName, comment, rating, customerPhoto, updateReviewTime } = props;

  return (
    <>
      <li>
        <div className="user_info">
          <img
            style={{ width: "50px", height: "50px" }}
          src={customerPhoto}
          alt="user-img"
          />
          <div>
            <div style={{ marginLeft: "5px" }}>
              <h5 style={{ marginBottom: "5px" }}>{customerName}</h5>
              <small>{formatDateTime(updateReviewTime)}</small>
            </div>
          </div>
        </div>
        <div
          style={{ margin: "10px 0", display: "flex", alignItems: "center" }}
          className="user_ratings"
        >
          <span className="rating_star" style={{ marginRight: "10px" }}>
            {[...Array(Number(rating))].map((_, i) => (
              <IoMdStar style={{ color: "var(--main-color)" }} key={i} />
            ))}
          </span>
        </div>
        <p className="user_review">{comment}</p>
      </li>
    </>
  );
};

export default ProductReviews;
