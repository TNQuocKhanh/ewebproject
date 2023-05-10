import React from "react";
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const breadcrumbNameMap = {
  cart: "Giỏ hàng",
  "all-products": "Tất cả sản phẩm",
  orders: "Đơn hàng",
  profile: "Thông tin",
  "change-password": "Thay đổi mật khẩu",
  "product-details": "Chi tiết sản phẩm",
  checkout: "Thanh toán",
};

const Breadcrumbs = (props) => {
  const path = useLocation();
  const navigate = useNavigate();
  const pathnames = path.pathname?.split("/").filter((x) => x);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="container">
      <MUIBreadcrumbs
        aria-label="breadcrumb"
        sx={{ marginTop: isSmall ? "12rem" : "10rem" }}
      >
        {pathnames?.length > 0 ? (
          <Link
            sx={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => navigate("/")}
          >
            Trang chủ
          </Link>
        ) : (
          <Typography> Trang chủ </Typography>
        )}
        {pathnames?.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography key={name}>{breadcrumbNameMap[name]}</Typography>
          ) : (
            <Link
              sx={{ cursor: "pointer", textDecoration: "none" }}
              key={name}
              onClick={() => navigate(routeTo)}
            >
              {breadcrumbNameMap[name]}
            </Link>
          );
        })}
      </MUIBreadcrumbs>
    </div>
  );
};
export default Breadcrumbs;
