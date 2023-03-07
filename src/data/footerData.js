import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export const footMenu = [
  {
    id: 1,
    title: "Trang",
    menu: [
      {
        id: 1,
        link: "Trang chủ",
        path: "/",
      },
      {
        id: 2,
        link: "Giỏ hàng",
        path: "/cart",
      },
      {
        id: 3,
        link: "Sản phẩm",
        path: "/all-products",
      },
      {
        id: 4,
        link: "Đơn hàng",
        path: "/orders",
      },
    ],
  },
  {
    id: 2,
    title: "Chính sách",
    menu: [
      {
        id: 1,
        link: "Bảo hành",
        path: "/",
      },
      {
        id: 2,
        link: "Đổi trả",
        path: "/",
      },
      {
        id: 3,
        link: "Hoàn tiền",
        path: "/",
      },
    ],
  },
  {
    id: 3,
    title: "Giới thiệu",
    menu: [
      {
        id: 1,
        link: "Về chúng tôi",
        path: "/",
      },
      {
        id: 2,
        link: "Liên hệ",
        path: "/",
      },
      {
        id: 3,
        link: "Dịch vụ",
        path: "/",
      },
    ],
  },
];

export const footSocial = [
  {
    id: 1,
    icon: <FaFacebookF />,
    path: "/",
  },
  {
    id: 2,
    icon: <FaTwitter />,
    path: "/",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    path: "/",
  },
  {
    id: 4,
    icon: <FaLinkedinIn />,
    path: "/",
  },
];
