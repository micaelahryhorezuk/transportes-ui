import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, CardActions, IconButton } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import { APIPrivate } from "../utils/constants";
import { openToaster } from "../redux/hooks/toaster";
import { closeLoading, openLoading } from "../redux/hooks/loading";

const useStyles = makeStyles((theme) => ({
    main: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    root: {
      display: 'flex',
      height: '95vh', 
      width: '95vw', 
      padding: '10px 10px 10px 10px',
      justifyContent: 'space-evenly',
    },
    child: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: "1em"
    },
    card: {
        width: "95vw",
        display: 'flex',
        margin: '10px 10px 10px 10px',
    },
    cardMedia: {
        maxHeight: '20vh',
        maxWidth: '20vw',
        textAlign: 'center',
        padding: '0 0 0 0 !important',
        objectFit: 'cover',
        margin:'auto 10px auto 10px',

    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        gap: '0.5em'
    },
    noMargin: {
        margin: '0 !important',
    }
}));

function StaffPage(props) {
    const classes = useStyles();
    const loaded = useRef(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.items.length !== items.length) {
            loaded.current = false;
        }

        if (loaded.current) return;
        loaded.current = true;
        setLoading(true);
        if (props.items) {
            setItems(props.items);
            setLoading(false);
        } else {
            axios.get(`${APIPrivate}/staff`)
            .then(res => {
                setItems(res?.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err)
                setLoading(false);
                openToaster({message: "Error al obtener elementos", type: "error"});
            })
        }
    }, [props, items.length])

    useEffect(() => {
        if (loading) {
            openLoading({message: 'Cargando elementos, espere por favor...'});
        } else {
            closeLoading();
        }
    }, [loading])

    return (
        <main className={classes.main}>
            <Grid className={classes.root} container>
            {
                Array.isArray(items) && items.length > 0
                ? 
                items.map((item, index) => 
                    <Grid key={index} item>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                component="img"
                                alt={"img-" + index}
                                image={item?.image || "images/default.png"}
                                onError={e => {
                                    e.target.src = "images/default.png";
                                }}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5">
                                    {item?.name || ""} &nbsp; {item?.lastname || ""}
                                </Typography>
                                <Typography variant="subtitle">
                                    <b>Contacto:&nbsp;</b>{item?.email || ""}
                                </Typography>
                                <Typography variant="subtitle">
                                    <b>Rol:&nbsp;</b>{item?.role || ""}
                                </Typography>
                                <Typography variant="body2">
                                    {item?.description || ""}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                            {props.onDelete &&
                                <IconButton aria-label="add to favorites" onClick={() => props.onDelete(item.id)}>
                                    <DeleteIcon color="error"/>
                                </IconButton>
                            }
                            {props.onUpdate &&
                                <IconButton aria-label="add to favorites" onClick={(e) => props.onUpdate(e, item.id)}>
                                    <EditIcon color="warning"/>
                                </IconButton>
                            }
                            </CardActions>
                        </Card>
                    </Grid>
                )
                :
                <Grid className={classes.child} item>
                    <Typography className={classes.noMargin} gutterBottom variant="body1">
                        No hay novedades para mostrar
                    </Typography>
                    <SentimentVeryDissatisfiedIcon fontSize="large"/>
                </Grid>
            }
            </Grid>
        </main>
    );
}

export default StaffPage;
