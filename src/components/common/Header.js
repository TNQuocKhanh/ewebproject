import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { dropdownMenu } from "../../data/headerData";
import commonContext from "../../contexts/common/commonContext";
import cartContext from "../../contexts/cart/cartContext";
import AccountForm from "../form/AccountForm";
import SearchBar from "./SearchBar";
import { getProfile, logout } from "../../apis";
import { storage } from "../../utils";

const Header = () => {
  const { formUserInfo, toggleForm, toggleSearch } = useContext(commonContext);
  const { cartItems } = useContext(cartContext);
  const [isSticky, setIsSticky] = useState(false);

  const navigate = useNavigate()

  // Get value of search
  const [valueSearch, setValueSearch] = useState("");
  console.log(valueSearch);

  // handle the sticky-header
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
                  <h4>
                    Xin chào !{" "}
                    {formUserInfo && <Link to="*">&nbsp;{formUserInfo}</Link>}
                  </h4>
                  {!formUserInfo && (
                    <button type="button" onClick={() => toggleForm(true)}>
                      Đăng nhập / Đăng ký
                    </button>
                  )}
                  <div className="separator"></div>
                  <ul>
                    <li><Link to='/profile'>Thong tin</Link></li>
                    <li><Link to='/change-password'>Doi mat khau</Link></li>
                    <li><Link to='/logout' onClick={handleLogout}>Dang xuat</Link></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div style={{ marginTop: "15px" }} className="navigation">
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
      <AccountForm />
    </>
  );
};

export default Header;