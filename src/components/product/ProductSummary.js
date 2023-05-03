import React, { useState } from "react";
import useActive from "../../hooks/useActive";
import ProductReviews from "./ProductReviews";
import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import { createReview } from "../../apis/product-review.api";

const ProductSummary = (props) => {
  const { listReview, customerCanReview, specs, description } = props;

  const { active, handleActive, activeClass } = useActive("specs");

  const specsTransform = specs?.split("\n");

  const params = useParams();
  const { productId } = params;

  const [value, setValue] = useState(5);
  const [comment, setComment] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview(productId, { comment, rating: value });
    } catch (e) {
      console.log("[Create review] error", e);
    }
  };

  return (
    <>
      <section id="product_summary" className="section">
        <div className="container">
          <div className="prod_summary_tabs">
            <ul className="tabs">
              <li
                className={`tabs_item ${activeClass("specs")}`}
                onClick={() => handleActive("specs")}
              >
                Thông số
              </li>
              <li
                className={`tabs_item ${activeClass("overview")}`}
                onClick={() => handleActive("overview")}
              >
                Tổng quan sản phẩm
              </li>
              <li
                className={`tabs_item ${activeClass("reviews")}`}
                onClick={() => handleActive("reviews")}
              >
                Đánh giá
              </li>
            </ul>
          </div>

          <div className="prod_summary_details">
            {active === "specs" ? (
              <div className="prod_specs">
                {specsTransform?.map((it) => (
                  <div>{it}</div>
                ))}
              </div>
            ) : active === "overview" ? (
              <div className="prod_overview">
                <p>{description}</p>
              </div>
            ) : (
              <div className="prod_reviews">
                {customerCanReview && (
                  <div>
                    <form
                      style={{ display: "flex", flexDirection: "column" }}
                      onSubmit={handleSubmit}
                    >
                      <h3 style={{ marginBottom: "30px" }}>
                        Đánh giá sản phẩm
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "20px",
                          fontSize: "20px",
                        }}
                      >
                        <h5 style={{ marginRight: "10px" }}>Chọn đánh giá:</h5>
                        <Rating
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />
                      </div>
                      <textarea
                        placeholder="Viết đánh giá"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{
                          minHeight: "100px",
                          border: "1px solid #cccccc",
                          borderRadius: "5px",
                          fontSize: "16px",
                          padding: "15px",
                        }}
                      />
                      <button
                        style={{
                          background: "var(--main-color)",
                          width: "150px",
                          padding: "15px 10px",
                          margin: "20px 0",
                          borderRadius: "10px",
                        }}
                        type="submit"
                      >
                        <strong style={{ fontSize: "14px", color: "white" }}>
                          Gửi đánh giá
                        </strong>
                      </button>
                    </form>
                  </div>
                )}

                <div>
                  <h3
                    style={{ margin: "30px 0" }}
                  >{`Đánh giá trước đó (${listReview.length})`}</h3>
                  <ul>
                    {listReview.map((item) => (
                      <ProductReviews key={item.id} {...item} />
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSummary;
