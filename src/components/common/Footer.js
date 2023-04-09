import React, { useState } from "react";
import { Link } from "react-router-dom";
import { footMenu, footSocial } from "../../data/footerData";

const Footer = () => {
  const [subValue, setSubValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubValue("");
    alert("Thankyou, you are subscribed to receive our daily newsletter");
  };

  const currYear = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="separator"></div>
      <div className="container">
        <div className="wrapper footer_wrapper">
          <div className="foot_about">
            <h2>
              <Link to="/">HDKShop</Link>
            </h2>
            <div className="foot_subs">
              <p style={{lineHeight: '30px'}}>
                Đăng ký với chúng tôi để nhận các thông tin ưu đãi và các sản
                phẩm mới nhất
              </p>
            </div>
          </div>

          {footMenu.map((item) => {
            const { id, title, menu } = item;
            return (
              <div className="foot_menu" key={id}>
                <h4>{title}</h4>
                <ul>
                  {menu.map((item) => {
                    const { id, link, path } = item;
                    return (
                      <li key={id}>
                        <Link to={path}>{link}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="sub_footer">
        <div className="container">
          <div className="sub_footer_wrapper">
            <div className="foot_copyright">
              <p>{currYear} | HDKShop. All Rights Reserved.</p>
            </div>
            <div className="foot_social">
              {footSocial.map((item) => {
                const { id, icon, path } = item;
                return (
                  <Link to={path} key={id}>
                    {icon}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
