import { useEffect, useState } from "react";
import { getVouchers } from "../apis";
import { Grid, Typography } from "@mui/material";
import { formatDDMMYYYY, formatPrice } from "../utils";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    background: "#f0fff3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  couponCard: {
    background: "linear-gradient(135deg, #9d4de6, #f5c24c)",
    color: "#3c3c3c",
    textAlign: "center",
    padding: "10px 60px",
    borderRadius: "15px",
    boxShadow: "0 10px 10px 0 rgba(0, 0, 0, 0.15)",
    position: "relative",
  },
  couponRow: {
    display: "flex",
    alignItems: "center",
    margin: "25px auto",
    width: "fit-content",
  },
  cpnCode: {
    border: "1px dashed #fff",
    padding: "10px 20px",
    fontWeight: "600",
    color: "#fff",
    fontSize: "24px",
  },
  circle: {
    background: "#f0fff3",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
}));

const Voucher = (props) => {
  const { record } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.container}>
      <div
        className={classes.couponCard}
        style={isSmall ? { width: "100%" } : { width: "50%" }}
      >
        <h3>
          Giảm {formatPrice(record.voucherDiscount)}&nbsp; cho đơn hàng từ{" "}
          {formatPrice(record.orderMinimumToUse)}
        </h3>
        <di className={classes.couponRow}>
          <span className={classes.cpnCode}>
            <code>{record.voucherCode}</code>
          </span>
        </di>
        <p style={{ fontStyle: "italic" }}>
          Hạn sử dụng: {formatDDMMYYYY(record.endDate)}
        </p>
        <div>
          {record.used ? (
            <Typography variant="caption" sx={{ color: "red" }}>
              Đã sử dụng
            </Typography>
          ) : (
            <Typography variant="caption" sx={{ color: "green" }}>
              Chưa sử dụng
            </Typography>
          )}
        </div>
        <div className={classes.circle} style={{ left: "-25px" }}></div>
        <div className={classes.circle} style={{ right: "-25px" }}></div>
      </div>
    </div>
  );
};

export const VoucherManagement = () => {
  const [data, setData] = useState([]);

  const fetchVouchers = async () => {
    try {
      const res = await getVouchers();
      setData(res);
    } catch (err) {
      console.log("[fetchVouchers] error", err);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <div>
          {data.map((it) => {
            return (
              <Grid container spacing={2} key={it.id}>
                <Grid item md={12} xs={12}>
                  <div style={{ margin: "10px 0" }}>
                    <Voucher record={it} />
                  </div>
                </Grid>
              </Grid>
            );
          })}
        </div>
      ) : (
        <Typography color="text.secondary">Không có mã giảm giá nào</Typography>
      )}
    </div>
  );
};
