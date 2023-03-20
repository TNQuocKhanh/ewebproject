import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import cartContext from "../../contexts/cart/cartContext";
import SearchBar from "./SearchBar";
import { getProfile, logout } from "../../apis";
import { storage } from "../../utils";

const Header = () => {
  const { cartItems } = useContext(cartContext);
  const [isSticky, setIsSticky] = useState(false);

  const navigate = useNavigate()

  const [valueSearch, setValueSearch] = useState("");
  console.log(valueSearch);

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
    const res = await logout();
    console.log("===res", res);
    if (res.status === 200) {
      storage.remove("user");
    }
    navigate('/login')
  };

  const [userProfile, setUserProfile] = useState()
  
  const getUserProfile = async () => {
    const res = await getProfile()
    setUserProfile(res)
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  console.log('===user', userProfile)

  return (
    <>
      <header id="header" className={isSticky ? "sticky" : ""}>
        <div className="container">
          <div className="navbar">
            <h2 className="nav_logo">
              <Link to="/">HDKShop</Link>
            </h2>
            <div className="nav-search">
              <input
                onChange={(e) => setValueSearch(e.target.value)}
                placeholder="Tìm kiếm..."
                type="text"
              ></input>
              <button>
                <AiOutlineSearch />
              </button>
            </div>
            <nav className="nav_actions">
              <div className="cart_action">
                <Link to="/cart">
                  <AiOutlineShoppingCart />
                  {cartQuantity > 0 && (
                    <span className="badge">{cartQuantity}</span>
                  )}
                </Link>
                <div className="tooltip">Giỏ hàng</div>
              </div>

              <div className="user_action">
                <span>
                  <AiOutlineUser />
                </span>
                <div>{userProfile?.fullName}</div>
                <div className="dropdown_menu">
                  <ul>
                    <li><Link to='/profile'>Thông tin</Link></li>
                    <li><Link to='/change-password'>Đổi mật khẩu</Link></li>
                    <li><Link to='/logout' onClick={handleLogout}>Dang xuat</Link></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div style={{ marginTop: "15px" }} className="navigation container">
          <div>Danh mục</div>
          <div>
            <NavLink style={{ marginLeft: "10px" }} to="/">
              Trang chủ
            </NavLink>
            <NavLink style={{ marginLeft: "10px" }} to="/cart">
              Giỏ hàng
            </NavLink>
            <NavLink style={{ marginLeft: "10px" }} to="/all-products">
              Sản phẩm
            </NavLink>
            <NavLink style={{ marginLeft: "10px" }} to="/orders">
              Đơn hàng
            </NavLink>
          </div>
        </div>
      </header>

      <SearchBar />
    </>
  );
};

export default Header;
