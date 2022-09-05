import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { APIPrivate } from "../utils/constants";
import axios from "axios";

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

function StaffPage() {
    const classes = useStyles();
    const loaded = useRef(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loaded.current) return;
        loaded.current = true;
        setLoading(true);
        axios.get(`${APIPrivate}/staff`)
        .then(res => {
            setItems(res?.data || [])
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            setLoading(false)
        })
    }, [loading])



    return (
        <main className={classes.main}>
        {
            !loading 
            ?
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
            : 
                <Grid className={classes.root} container>
                    <Grid className={classes.child} item>
                        <CircularProgress />
                    </Grid>
                </Grid>
        }
        </main>
    );
}

export default StaffPage;
