import React from "react";
import ReactLoading from "react-loading";
import { makeStyles } from "@mui/styles";
import {
  LinearProgress,
  Skeleton,
  Typography,
  Card,
  Grid,
} from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  loading: {
    marginTop: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const Loading = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.loading}>
        <ReactLoading type={"bars"} color="#f5c24c" />
        <Typography variant="h6">Đang tải ...</Typography>
      </div>
    </>
  );
};

export const LinearLoading = () => {
  return <LinearProgress />;
};

export const DetailLoading = () => {
  return (
    <>
      <Header />
      <section id="product_details" className="container" style={{marginTop: '10rem'}}>
        <Grid container spacing={4} xs={12} className="container">
          <Grid item xs={12} md={4}>
            <Skeleton variant="rounded" height={300} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rounded" height={110} />
            <Skeleton variant="rounded" height={90} sx={{ margin: "10px 0" }} />
            <Skeleton variant="rounded" height={100} />
          </Grid>
        </Grid>
      </section>
      <section id="product_summary" className="container">
        <Grid container spacing={4} xs={12} className="container">
          <Grid item xs={12} md={12}>
            <Skeleton variant="rounded" height={110} />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export const ProfileLoading = () => {
  return (
    <>
      <Header />
      <section className="container">
        <Grid container  xs={12} className="container">
          <Grid item xs={12} md={4}>
            <Skeleton
            style={{margin: '15px'}}
              animation="wave"
              variant="circular"
              width={200}
              height={200}
          />
            <Skeleton variant="rounded" height={20} width='70%' />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="rounded" height={80} sx={{ margin: "10px 0" }} />
            <Skeleton variant="rounded" height={80} />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export const BubbleLoading = () => {
 const classes = useStyles()
  return (
      <div className={classes.loading}>
        <ReactLoading type={"spinningBubbles"} color="#f5c24c" />;
      </div>
  )
}
