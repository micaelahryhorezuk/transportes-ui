import React, { useEffect, useState } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Fade, Modal, Backdrop } from '@mui/material';
import { getUserOfflineInfo, setRedirectUrl } from "../utils/functions";
import Login from "./Login";

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[10],
      padding: theme.spacing(1),
      borderRadius: "5px",
      border: "2px solid " + theme.palette.grey.A200,
    },
  })
);

const LoginModal = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (props.open === true) {
      setRedirectUrl(
        window.location.pathname.length > 1 ? window.location.pathname : ""
      );
    }
    setOpen(props.open);
  }, [props.open]);

  const HandleClose = (user) => {
    if (user) setOpen(false);
    props.onClose(user);
  };

  const getUserInfo = () => {
    return getUserOfflineInfo();
  };

  return (
    <Modal
      open={open}
      className={classes.modal}
      BackdropComponent={Backdrop}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <Login
            inModal={true}
            rootUrl={props.rootUrl === "" ? "" : props.rootUrl || "/"}
            user={getUserInfo()}
            subtitle={props.subtitle}
            onClose={HandleClose}
          />
        </div>
      </Fade>
    </Modal>
  );
};

export default LoginModal;
