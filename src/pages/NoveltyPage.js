import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
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
    cardContent: {},
    noMargin: {
        margin: '0 !important',
    }
}));

function NoveltyPage() {
    const classes = useStyles();
    const loaded = useRef(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loaded.current) return;
        loaded.current = true;
        setLoading(true);
        axios.get(`${APIPrivate}/novelty`)
        .then(res => {
            setItems(res?.data || []);
            setLoading(false);
        })
        .catch(err => {
            console.error(err)
            setLoading(false);
            openToaster({message: "Error al obtener elementos", type: "error"});
        })
    }, [])

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
                                    {item?.title || ""}
                                </Typography>
                                <Typography gutterBottom variant="h6">
                                    {item?.subtitle || ""}
                                </Typography>
                                <Typography variant="body2">
                                    {item?.body || ""}
                                </Typography>
                            </CardContent>
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

export default NoveltyPage;
