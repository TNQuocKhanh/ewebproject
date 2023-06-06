export const formatDateTime = (value) => {
  const a = new Date(value).toString().split(/\s/);
  return (
    a[2] +
    "/" +
    {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    }[a[1]] +
    "/" +
    a[3] +
    " " +
    a[4]
  );
};

export const formatPrice = (value) => {
  const result = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
  return result;
};
export const getStatus = (value) => {
  switch (value) {
    case "NEW":
      return { text: "Chờ xác nhận", color: "#eaf6f9" };
    case "PAID":
      return { text: "Đã thanh toán", color: "#eaf6f9" };
    case "UNPAID":
      return { text: "Chưa thanh toán", color: "#eaf6f9" };
    case "REFUND":
      return { text: "Đã hoàn tiền", color: "#eaf6f9" };
    case "DELIVERED":
      return { text: "Đã giao hàng", color: "#eaf6f9" };
    case "PROCESSING":
      return { text: "Đang xử lý", color: "#eaf6f9" };
    case "PACKAGED":
      return { text: "Đang xử lý", color: "#eaf6f9" };
    case "SHIPPING":
      return { text: "Đang giao hàng", color: "#eaf6f9" };
    case "RETURNED":
      return { text: "Đã huỷ", color: "#eaf6f9" };
    case "CANCELED":
      return { text: "Đã huỷ", color: "#eaf6f9" };
    case "REFUND_PENDING":
      return { text: "Đang chờ hoàn tiền", color: "#eaf6f9" };
    default:
      return { text: "Không xác định", color: "#d7d8da" };
  }
};

export const formatDDMMYYYY = (value) => {
  const dd = value.slice(8, 10);
  const mm = value.slice(5, 7);
  const yyyy = value.slice(0, 4);

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  return formattedToday;
};
