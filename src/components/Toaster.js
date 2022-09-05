import MuiAlert from "@mui/lab/Alert";
import { CheckCircleOutline, Close, ErrorOutline, ExpandLess, ExpandMore, InfoOutlined, WarningOutlined } from "@mui/icons-material";
import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
import { makeStyles } from '@mui/styles';
import React, { useState } from "react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  outlined: {
    borderWidth: 3,
    paddingBottom: 0,
    paddingTop: 0,
  },
  snackbar: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
  },
  root: {
    width: "100%",
  },
  content: {
    maxHeight: "50vh",
    overflow: "auto",
  },
  color: {
    color: (props) => {
      switch (props?.type) {
        case "error":
          return theme.palette.error.main;
        case "warning":
          return theme.palette.warning.main;
        case "success":
          return theme.palette.success.main;
        case "info":
          return theme.palette.info.main;
        default:
          return theme.palette.common.black;
      }
    },
  },
}));

// export interface ToasterProps {
//   open: boolean;
//   duration?: number;
//   message: string;
//   description?: string;
//   type?: "error" | "warning" | "info" | "success";
//   variant?: "standard" | "filled" | "outlined";
//   onClose: () => void;
//   classes?: {
//     root?: string;
//     snackbar?: string;
//     alert?: string;
//     message?: string;
//     description?: string;
//   };
// }

const Toaster = (props) => {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);

  const handleClose = (_event, reason=false) => {
    if (reason === "clickaway") {
      return;
    }
    props.onClose();
  };

  return (
    <div className={props.classes?.root || classes.root}>
      <Snackbar
        open={props.open}
        autoHideDuration={
          props.description && !props.duration ? 60000 : props.duration || 3000
        }
        onClose={handleClose}
        className={props.classes?.snackbar || classes.snackbar}
      >
        <>
          <Alert
            className={props.classes?.alert}
            action={
              <>
                {props.description && (
                  <IconButton size="small" onClick={() => setOpen(!open)}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                )}

                <IconButton
                  size="small"
                  onClick={() => handleClose(undefined, "close")}
                  className={classes.color}
                >
                  <Close />
                </IconButton>
              </>
            }
            onClose={handleClose}
            severity={props.type || "info"}
            variant={props.variant || "outlined"}
            icon={
              props.type === "success" ? (
                <CheckCircleOutline />
              ) : props.type === "error" ? (
                <ErrorOutline />
              ) : props.type === "info" ? (
                <InfoOutlined />
              ) : props.type === "warning" ? (
                <WarningOutlined />
              ) : undefined
            }
            classes={{
              outlinedError: classes.outlined,
              outlinedInfo: classes.outlined,
              outlinedSuccess: classes.outlined,
              outlinedWarning: classes.outlined,
            }}
          >
            <div className={props.classes?.message} style={{ paddingTop: 1 }}>
              {props.message}
            </div>
            {open && (
              <SnackbarContent
                className={props.classes?.description || classes.content}
                message={props.description}
              />
            )}
          </Alert>
        </>
      </Snackbar>
    </div>
  );
};

export default Toaster;
