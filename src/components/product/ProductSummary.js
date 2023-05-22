import React, { useState } from "react";
import useActive from "../../hooks/useActive";
import ProductReviews from "./ProductReviews";
import { CircularProgress, Divider, Rating, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { createReview } from "../../apis/product-review.api";
import _ from "lodash";
import { toast } from "react-toastify";
import Toastify from "./Toastify";

const ProductSummary = (props) => {
  const { listReview = [], customerCanReview, specs, description } = props;

  const { active, handleActive, activeClass } = useActive("overview");

  const specsTransform = specs?.split("\n");

  const params = useParams();
  const { productId } = params;

  const [value, setValue] = useState(5);
  const [comment, setComment] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createReview(productId, { comment, rating: value });
      toast.success("Cập nhật đánh giá thành công");
    } catch (e) {
      console.log("[Create review] error", e);
    }
    setLoading(false);
  };

  return (
    <>
      <section id="product_summary" className="container">
        <div className="container">
          <div className="prod_summary_tabs" style={{ marginBottom: "16px" }}>
            <ul className="tabs">
              <li
                className={`tabs_item ${activeClass("overview")}`}
                onClick={() => handleActive("overview")}
              >
                Tổng quan sản phẩm
              </li>
              <li
                className={`tabs_item ${activeClass("specs")}`}
                onClick={() => handleActive("specs")}
              >
                Thông số
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
                {specsTransform?.map((it, idx) => (
                  <div style={{ fontWeight: 500 }} key={idx}>
                    {it}
                  </div>
                ))}
              </div>
            ) : active === "overview" ? (
              <div className="prod_overview">
                <p>{description}</p>
              </div>
            ) : (
              <div className="prod_reviews">
                <div>
                  <h3
                    style={{ margin: "30px 0" }}
                  >{`Đánh giá trước đó (${listReview.length})`}</h3>
                  <ul>
                    {!_.isEmpty(listReview) &&
                      listReview.map((item) => (
                        <>
                          <ProductReviews key={item.id} {...item} />
                          <Divider />
                        </>
                      ))}
                  </ul>
                </div>
                {customerCanReview && (
                  <div>
                    <form
                      style={{ display: "flex", flexDirection: "column" }}
                      onSubmit={handleSubmit}
                    >
                      <h3 style={{ margin: "20px 0" }}>Đánh giá sản phẩm</h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      ></div>
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
                      <>
                        {loading ? (
                          <CircularProgress sx={{ margin: "20px 0" }} />
                        ) : (
                          <Button
                            type="submit"
                            disabled={!comment}
                            sx={{
                              bgcolor: "#f4c24b",
                              width: "fit-content",
                              padding: "10px",
                              margin: "20px 0",
                              color: "#fff",
                              borderRadius: "5px",
                              fontWeight: "600",
                              ":hover": {
                                bgcolor: "#ff0000cc",
                              },
                            }}
                          >
                            Gửi đánh giá
                          </Button>
                        )}
                      </>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Toastify />
      </section>
    </>
  );
};

export default ProductSummary;
