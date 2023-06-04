import { useEffect, useState } from "react";
import { getVouchers } from "../apis";
import { Card, Grid, Typography } from "@mui/material";
import { formatPrice } from "../utils";

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
              <Card
                sx={{ minWidth: 700, marginBottom: 2, padding: 2 }}
                variant="outlined"
              >
                <Grid container>
                  <Grid item md={12} xs={12}>
                    <Typography color="text.secondary">
                      Tên mã voucher: {it.name}
                    </Typography>
                    <Typography color="text.secondary">
                      Mã voucher: {it.voucherCode}
                    </Typography>
                    <Typography color="text.secondary">
                      Giảm:{" "}
                      {`${formatPrice(
                        it.voucherDiscount
                      )} cho đơn hàng từ ${formatPrice(it.orderMinimumToUse)}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            );
          })}
        </div>
      ) : (
        <Typography color="text.secondary">Không có mã giảm giá nào</Typography>
      )}
    </div>
  );
};
