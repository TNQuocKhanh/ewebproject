import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBars,
  AiOutlineCaretDown,
  AiOutlineLaptop,
} from "react-icons/ai";
import cartContext from "../../contexts/cart/cartContext";
import { getListCategories, getProfile, logout } from "../../apis";
import { storage } from "../../utils";
import logo from "../../data/logo.png";

const Header = () => {
  const { cartItems } = useContext(cartContext);
  const [isSticky, setIsSticky] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const [categoryList, setCategoryList] = useState([]);

  const getAllCategory = async () => {
    try {
      const res = await getListCategories();
      setCategoryList(res);
    } catch (e) {
      console.log("===Error");
    }
  };

  const navigate = useNavigate();

  const [valueSearch, setValueSearch] = useState("");

  useEffect(() => {
    const handleIsSticky = () =>
      window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);

    window.addEventListener("scroll", handleIsSticky);

    return () => {
      window.removeEventListener("scroll", handleIsSticky);
    };
  }, [isSticky]);

  const cartQuantity = cartItems.length;

  const handleLogout = async () => {
    try {
      await logout();
      storage.remove("user");
      navigate("/login");
    } catch (error) {
      console.log("===Error", error);
    }
  };

  const [userProfile, setUserProfile] = useState();

  const getUserProfile = async () => {
    const res = await getProfile();
    setUserProfile(res);
  };

  const toggleCategory = () => {
    openCategory === false ? setOpenCategory(true) : setOpenCategory(false);
  };

  useEffect(() => {
    if (storage.load("user")) {
      getUserProfile();
    }
    getAllCategory();
  }, []);

  const handleSearch = () => {
    console.log("===valueSearch", valueSearch);
  };

  return (
    <>
      <header id="header" className={isSticky ? "sticky" : ""}>
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
              {userProfile?.fullName && (
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
                          <Link to="/profile">Thông tin</Link>
                        </li>
                        <li>
                          <Link to="/change-password">Đổi mật khẩu</Link>
                        </li>
                        <li>
                          <Link to="/login" onClick={handleLogout}>
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
                      {userProfile?.fullName}
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
                <div className="tooltip">Giỏ hàng</div>
              </div>
              {!userProfile?.fullName && (
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
              hidden={openCategory ? false : true}
              style={{
                position: "absolute",
                width: "100%",
                borderRadius: "5px",
                background: "white",
              }}
            >
              <ul style={{ borderRadius: "10px" }}>
                {categoryList.map((it, idx) => (
                  <li
                    key={idx}
                    className="category-item"
                    style={{ padding: "15px" }}
                  >
                    <AiOutlineLaptop
                      style={{ fontSize: "20px", marginRight: "10px" }}
                    />
                    {it.name}{" "}
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
            <NavLink
              style={{ marginLeft: "15px", fontSize: "0.8rem" }}
              to="/orders"
            >
              <strong>Đơn hàng</strong>
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
