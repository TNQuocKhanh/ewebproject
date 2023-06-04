import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

const SectionsHead = (props) => {
  return (
    <>
      {props.viewAll ? (
        <div
          style={{
            backgroundImage: props.background,
            padding: "20px",
            color: props.color,
            marginBottom: "2px",
            display: "flex",
            justifyContent: "space-between",
          }}
          className="section_head"
        >
          <h2 className="heading">{props.heading}</h2>
          <Link
            style={{ fontSize: "20px", fontWeight: "bold" }}
            className="heading"
            to={"/all-products"}
          >
            Xem tất cả <ArrowForwardIosIcon fontSize="small" />
          </Link>
        </div>
      ) : (
        <div
          style={{
            backgroundImage: props.background,
            padding: "20px",
            color: props.color,
            marginBottom: "2px",
          }}
          className="section_head"
        >
          <h2 className="heading">{props.heading}</h2>
        </div>
      )}
    </>
  );
};

export default SectionsHead;
