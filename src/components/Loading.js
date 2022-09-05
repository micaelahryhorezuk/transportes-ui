import { Backdrop, CircularProgress, Grid } from "@mui/material";
import { makeStyles, createStyles } from '@mui/styles';

import React from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
    paper: {
      boxShadow: theme.shadows[10],
      padding: theme.spacing(2, 4, 2),
      backgroundColor: theme.palette.common.white,
      color: theme.palette.secondary.main,
      textAlign: "center",
      wordWrap: "break-word",
      width: "fit-content",
      maxWidth: "90% !important",
      display: "flex",
    },
    text: {
      marginTop: 10,
      [theme.breakpoints.down("sm")]: {
        fontSize: "small",
      },
    },
    spinner: {
      margin: "0 auto",
    },
  })
);

// export interface LoadingProps {
//   open: boolean;
//   message: string;
//   classes?: {
//     spinner?: string;
//     text?: string;
//     backdrop?: string;
//     paper?: string;
//   };
// }

const Loading = (props) => {
  const classes = useStyles();

  return (
    <Backdrop
      className={props.classes?.backdrop || classes.backdrop}
      open={props.open}
    >
      <Grid
        container
        className={props.classes?.paper || classes.paper}
        alignContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          className={props.classes?.spinner || classes.spinner}
        >
          <CircularProgress size={30} color="inherit" />
        </Grid>
        <Grid item xs={12} className={props.classes?.text || classes.text}>
          {props.message}
        </Grid>
      </Grid>
    </Backdrop>
  );
};

export default Loading;
