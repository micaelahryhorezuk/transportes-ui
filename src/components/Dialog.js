import React from "react";
import { Dialog as DialogMaterial, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Paper } from "@mui/material";
import { makeStyles, createStyles } from '@mui/styles';
import Draggable from "react-draggable";
import clsx from "clsx";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0, 3),
      wordWrap: "break-word",
    },
    title: {
      wordWrap: "break-word",
      padding: theme.spacing(1, 3, 0, 3),
      paddingTop: "24px",
      "& > h2": {
        fontSize: (props) => {
          if (props.fontSize) return props.fontSize;
          return "large";
        },
        fontWeight: "bold",
      },
    },
    content: {
      wordWrap: "break-word",
      padding: theme.spacing(1, 3, 0, 3),
    },
    contenttext: {
      fontSize: (props) => {
        if (props.fontSize) return props.fontSize - 3;
        return "small";
      },
    },
    color: {
      color: (props) => {
        if (props.variant !== "filled") {
          switch (props.type) {
            case "error":
              return theme.palette.error.main;
            case "success":
              return theme.palette.success.main;
            case "warning":
              return theme.palette.warning.main;
            default:
              return theme.palette.success.main;
          }
        } else {
          switch (props.type) {
            case "error":
              return theme.palette.common.white;
            case "success":
              return theme.palette.common.white;
            default:
              return theme.palette.common.black;
          }
        }
      },
      backgroundColor: (props) => {
        if (props.variant === "filled") {
          switch (props.type) {
            case "error":
              return theme.palette.error.main;
            case "success":
              return theme.palette.success.main;
            case "warning":
              return theme.palette.warning.main;
            default:
              return theme.palette.success.main;
          }
        }
        return theme.palette.common.white;
      },
    },
    container: {
      backgroundColor: theme.palette.common.white,
    },
  })
);

// export interface DialogButton {
//   onClick: () => void;
//   caption?: string;
// }

// export interface DialogProps {
//   open: boolean;
//   container?: React.ReactInstance;
//   title?: string;
//   type?: "error" | "warning" | "info" | "success";
//   variant?: "filled";
//   message?: string;
//   buttonCancel: DialogButton;
//   buttonSubmit?: DialogButton;
//   classes?: {
//     container?: string;
//     title?: string;
//     content?: string;
//     actions?: string;
//     component?: string;
//   };
//   component?: React.ReactNode;
//   fontSize?: number;
// }

const Dialog = (props) => {
  const classes = useStyles(props);

  return (
    <DialogMaterial
      container={props.container}
      open={props.open}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      className={props.classes?.container}
      classes={{
        paper: classes.container,
      }}
    >
      <div className={!props.title ? classes.color : undefined}>
        {props.title && (
          <DialogTitle
            style={{ cursor: "move" }}
            id="draggable-dialog-title"
            className={clsx(classes.title, classes.color, props.classes?.title)}
          >
            {props.title}
          </DialogTitle>
        )}
        <DialogContent className={props.classes?.content || classes.content}>
          {props.message && (
            <DialogContentText className={classes.contenttext}>
              {props.message}
            </DialogContentText>
          )}
          {props.component && (
            <div className={props.classes?.component}>{props.component}</div>
          )}
        </DialogContent>
        <DialogActions
          className={props.classes?.actions}
          style={{ paddingRight: "16px" }}
        >
          <Button
            color="secondary"
            autoFocus
            onClick={props.buttonCancel.onClick}
          >
            {props.buttonCancel.caption
              ? props.buttonCancel.caption
              : props.buttonSubmit
              ? "Cancelar"
              : "Cerrar"}
          </Button>
          {props.buttonSubmit && (
            <Button color="secondary" onClick={props.buttonSubmit.onClick}>
              {props.buttonSubmit.caption || "Aceptar"}
            </Button>
          )}
        </DialogActions>
      </div>
    </DialogMaterial>
  );
};

export default Dialog;

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
