import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBars,
  AiOutlineCaretDown,
} from "react-icons/ai";
import CategoryIcon from "@mui/icons-material/Category";
import cartContext from "../../contexts/cart/cartContext";
import commonContext from "../../contexts/common/commonContext";
import { logout } from "../../apis";
import { storage } from "../../utils";
import logo from "../../data/logo.png";
import { AiOutlineRetweet } from "react-icons/ai";
import { AiOutlineExport } from "react-icons/ai";

const Header = () => {
  const { cart } = useContext(cartContext);
  const { profile, category = [] } = useContext(commonContext);
  const navigate = useNavigate();

  const [valueSearch, setValueSearch] = useState("");
  const [openCategory, setOpenCategory] = useState(false);

  const cartQuantity = useMemo(() => {
    if (!cart || !cart.length) return 0;
    return  cart?.reduce((val, acc) => {
      return val + acc.quantity;
    }, 0);
  }, [cart]);

  const toggleCategory = () => {
    openCategory === false ? setOpenCategory(true) : setOpenCategory(false);
  };

  window.addEventListener("mouseup", function (event) {
    var pol = document.getElementById("box-item");
    if (event.target !== pol && event.target.parentNode !== pol) {
      setOpenCategory(false);
    }
  });

  const handleSearch = () => {
    navigate(
      `/all-products?` + new URLSearchParams({ productName: valueSearch })
    );
  };

  const handleClickCategory = (value) => {
    navigate(`/all-products?` + new URLSearchParams({ categoryId: value }));
  };

  const handleLogout = async () => {
    try {
      await logout();
      storage.remove("user");
      navigate("/login");
    } catch (error) {
      console.log("[Logout] Error", error);
    }
  };

  return (
    <>
      <header id="header">
        <div className="container">
          <div className="navbar">
            <h2 className="nav_logo">
              <Link to="/">
                <img src={logo} alt="logo" width="100px" />
              </Link>
            </h2>
            <div className="nav-search">
              <input
                onChange={(e) => setValueSearch(e.target.value)}
                placeholder="Tìm kiếm..."
                type="text"
              ></input>
              <button onClick={handleSearch}>
                <AiOutlineSearch />
              </button>
            </div>
            <nav className="nav_actions">
              {profile?.fullName && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    className="user_action"
                    style={{
                      border: "1px solid black",
                      borderRadius: "50%",
                      color: "var(--main-color-2)",
                      background: "var(--main-color)",
                    }}
                  >
                    <span>
                      <AiOutlineUser style={{ margin: "10px" }} />
                    </span>
                    <div className="dropdown_menu">
                      <ul>
                        <li>
                          <Link className="item-menu" to="/profile">
                            <AiOutlineUser
                              style={{ fontSize: "20px", marginRight: "20px" }}
                            />
                            Thông tin tài khoản
                          </Link>
                        </li>
                        <li>
                          <Link className="item-menu" to="/change-password">
                            <AiOutlineRetweet
                              style={{ fontSize: "20px", marginRight: "20px" }}
                            />
                            Thay đổi mật khẩu
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="item-menu"
                            to="/login"
                            onClick={handleLogout}
                          >
                            <AiOutlineExport
                              style={{ fontSize: "20px", marginRight: "20px" }}
                            />
                            Đăng xuất
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "0 8px",
                    }}
                  >
                    <small style={{ fontSize: "0.7rem", paddingBottom: "2px" }}>
                      Xin chào,
                    </small>
                    <strong style={{ fontSize: "0.8rem", paddingTop: "2 px" }}>
                      {profile?.fullName}
                    </strong>
                  </div>
                </div>
              )}
              <div className="cart_action">
                <Link to="/cart">
                  <div
                    style={{
                      border: "1px solid black",
                      borderRadius: "50%",
                      color: "var(--main-color)",
                      background: "black",
                    }}
                  >
                    <AiOutlineShoppingCart style={{ margin: "10px" }} />
                    {cartQuantity > 0 && (
                      <span className="badge">{cartQuantity}</span>
                    )}
                  </div>
                </Link>
              </div>
              {!profile?.fullName && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Link to="/login">
                    <strong style={{ fontSize: "0.9rem" }}>Đăng nhập</strong>
                  </Link>
                  <small style={{ margin: "0 5px" }}>|</small>
                  <Link to="/register">
                    <small style={{ fontSize: "0.9rem" }}>Đăng ký </small>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
        <div style={{ opacity: 0.2, background: "gray", height: "1px" }}></div>
        <div
          style={{ marginTop: "5px", marginBottom: "5px" }}
          className="navigation container"
        >
          <div style={{ position: "relative" }}>
            <div
              id="category"
              onClick={toggleCategory}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#ffdc8be0",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <AiOutlineBars
                style={{ fontSize: "1.4rem", marginRight: "10px" }}
              />
              <strong style={{ fontSize: "0.9rem" }}>Danh mục sản phẩm</strong>
              <AiOutlineCaretDown
                style={{ fontSize: "1rem", marginLeft: "20px" }}
              />
            </div>
            <div
              id="box-item"
              hidden={openCategory ? false : true}
              style={{
                position: "absolute",
                width: "100%",
                borderRadius: "5px",
                background: "white",
              }}
            >
              <ul style={{ borderRadius: "10px" }}>
                {category.map((it, idx) => (
                  <li
                    key={idx}
                    className="category-item"
                    style={{ padding: "15px" }}
                    onClick={() => handleClickCategory(it.id)}
                  >
                    <CategoryIcon
                      style={{ fontSize: "20px", marginRight: "10px" }}
                    />
                    {it.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <NavLink style={{ marginLeft: "15px", fontSize: "0.8rem" }} to="/">
              <strong>Trang chủ</strong>
            </NavLink>
            <NavLink
              style={{ marginLeft: "15px", fontSize: "0.8rem" }}
              to="/cart"
            >
              <strong>Giỏ hàng</strong>
            </NavLink>
            <NavLink
              style={{ marginLeft: "15px", fontSize: "0.8rem" }}
              to="/all-products"
            >
              <strong>Sản phẩm</strong>
            </NavLink>
            {storage.load("user") && (
              <NavLink
                style={{ marginLeft: "15px", fontSize: "0.8rem" }}
                to="/orders"
              >
                <strong>Đơn hàng</strong>
              </NavLink>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
