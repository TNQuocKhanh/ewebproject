import {FaShippingFast, FaShieldAlt, FaTags, FaCreditCard} from 'react-icons/fa';

const servicesData = [
    {
        id: 1,
        icon: <FaShippingFast />,
        title: "Giao hàng nhanh chóng",
        info: "Giao hàng trong 24 giờ",
    },
    {
        id: 2,
        icon: <FaShieldAlt />,
        title: "Bảo hành chính hãng",
        info: "100% sản phẩm chính hãng",
    },
    {
        id: 3,
        icon: <FaTags />,
        title: "Ưu đãi hấp dẫn",
        info: "Trên tất cả các đơn đặt trước",
    },
    {
        id: 4,
        icon: <FaCreditCard />,
        title: "Thanh toán an toàn",
        info: "Thanh toán an toàn",
    },
];

export default servicesData;
