import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useForm } from "react-hook-form";
import { Avatar, Container, Link, Typography, TextField, Button, Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { getRedirectUrl, getUserLoggedInfo, setRedirectUrl, setUserLoggedInfo } from "../utils/functions";
import { APIPrivate } from "../utils/constants";
import axios from 'axios';
import clsx from "clsx";
import Loading from "./Loading";
import Toaster from "./Toaster";

const useStyles = makeStyles((theme) => ({
  copyright: {
    position: "absolute",
    bottom: "10px",
    width: "100vw",
    textAlign: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  maxHeight: {
    height: "100vh",
  },
  content: {
    padding: theme.spacing(1),
    position: "relative",
    borderRadius: "5px",
    border: "2px solid " + theme.palette.grey.A200,
  },
  avatarContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    width: "100%",
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.main,
    width: "250px",
    height: "250px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  [theme.breakpoints.down('md')]: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [url, setUrl] = useState(undefined);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toaster, setToaster] = useState(undefined);
  const {register, handleSubmit} = useForm();
  const config = {
    GeneralLogo: "/images/logo.png",
    LoginTitle: "Inicia sesion en Transportes",
    LoginHideRecovery: true,
    LoginHideRegister: true,
    GeneralCopyright: " "
  }

  useEffect(() => {
    try {
      const info = getUserLoggedInfo();
      if (info) {
        if (props.onClose) {
          props.onClose(info.user);
          return;
        }

        if (props.user && url === undefined) {
          setUrl("");
          return;
        }

        const lastUrl = getRedirectUrl();
        if (lastUrl && lastUrl !== "") {
          setRedirectUrl("");
          setUrl(lastUrl);
        }
      } else {
        setUrl("");
      }
    } catch (error) {
      setToaster({
        message: "Error Desconocido",
        type: "error",
      });
    }
  }, [refresh, props, url]);

  const onSubmit = (data) => {
    post(data);
  };

  const post = (data) => {
    setLoading(true);
    setToaster(undefined);
    if (!data?.username) data.username = props.user?.username;

    axios.post(`${APIPrivate}/login`, data)
      .then((response) => {
        console.log(response)
        setUserLoggedInfo(response?.data);
        setLoading(false);
        setRefresh(!refresh);
      })
      .catch((error) => {
        setLoading(false);
        const message = error?.data?.message || "Error Indefinido";
        const description = error?.data?.description;
        setToaster({
          open: true,
          description,
          message,
        });
      });
  };

  return (
    <>
      {url === undefined ? (
        <Loading open={true} message={"Iniciando aplicación..."} />
      ) : url !== "" ? (
        <Navigate
          to={url || "/home"}
        />
      ) : (
        <>
          <Container component="main" maxWidth={"sm"} style={{ padding: 0 }}>
            <div
              className={clsx(classes.paper, {
                [classes.maxHeight]: !props.inModal,
              })}
            >
              <Grid container className={classes.content}>
                <Grid item lg={6} md={6} className={classes.avatarContent}>
                  {config?.GeneralLogo ? (
                    <img
                      src={config.GeneralLogo}
                      alt="avatar"
                      className={classes.avatar}
                      style={{ background: "transparent" }}
                    />
                  ) : (
                    <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                    </Avatar>
                  )}
                </Grid>
                <Grid item lg={6} md={6}>
                  <Typography component="h1" variant="h6">
                    {config?.LoginTitle || "Ingreso a la aplicación"}
                  </Typography>

                  {props.subtitle && (
                    <Typography variant="subtitle2" color="error">
                      {props.subtitle}
                    </Typography>
                  )}

                  <form
                    name="formlogin"
                    id="formlogin"
                    className={classes.form}
                    onSubmit={handleSubmit(onSubmit)}
                    action="post"
                  >
                    {props.user ? (
                      <>
                        <Typography
                          variant="h6"
                          style={{ textAlign: "center" }}
                        >
                          {props.user.fullname || props.user.username}
                        </Typography>
                        <TextField
                          style={{ display: "none" }}
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="username"
                          label="Usuario"
                          autoComplete="username"
                        />
                      </>
                    ) : (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Usuario"
                        autoComplete="username"
                        required
                        {...register("username", { required: true })}
                      />
                    )}

                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label="Password"
                      type="password"
                      id="password"
                      required
                      autoComplete="current-password"
                      {...register("password", { required: true })}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={clsx(classes.submit)}
                    >
                      Ingresar
                    </Button>

                    {props.inModal ||
                    (config?.LoginHideRecovery &&
                      config?.LoginHideRegister) ? null : (
                      <Grid container>

                        {!config?.LoginHideRecovery && (
                          <Grid item>
                            <Link href="/recovery" variant="body2">
                              Olvidaste la contraseña?
                            </Link>
                          </Grid>
                        )}

                        {!config?.LoginHideRegister && (
                          <Grid item>
                            <Link href="/register" variant="body2">
                              No tienes cuenta? Registrate aquí
                            </Link>
                          </Grid>
                        )}
                      </Grid>
                    )}

                    {props.user && props.rootUrl && (
                      <Grid container alignItems="center">
                        <Grid item xs={12}>
                          <Link
                            href={props.rootUrl}
                            variant="body2"
                            onClick={() => {
                              setUserLoggedInfo(null);
                            }}
                          >
                            ¿Cambiar de usuario?
                          </Link>
                        </Grid>
                      </Grid>
                    )}
                  </form>
                </Grid>
              </Grid>
            </div>
          </Container>

          {config?.GeneralCopyright && !props.inModal && (
            <Box className={classes.copyright}>
              <Typography variant="body2" color="textSecondary">
                {"Copyright © "}
                <Link color="inherit" href={config.GeneralCopyright.url}>
                  {config.GeneralCopyright.name}
                </Link>{" "}
                {config.GeneralCopyright.year || new Date().getFullYear()}
                {"."}
              </Typography>
            </Box>
          )}

          <Loading
            open={loading}
            message={"Validando usuario, espere por favor..."}
          />

          <Toaster
            open={toaster?.open === true}
            message={toaster?.message || ""}
            description={toaster?.description}
            type="error"
            onClose={() => setToaster(undefined)}
          />
        </>
      )}
    </>
  );
};

export default Login;