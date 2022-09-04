import React from "react";
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const useStyles = makeStyles({
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
    card: {
      display: 'flex',
      margin: '10px 10px 10px 10px',
    },
    cardMedia: {
        maxHeight: '20vh',
        maxWidth: '20vw',
        textAlign: 'center',
        padding: '0 0 0 0 !important',
        objectFit: 'contain',
        margin:'auto 10px auto 10px',
    },
    cardContent: {},
    cardContentHeader: {
      display: 'flex',
      flexDirection:'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    }
});

function StaffPage() {
    const classes = useStyles();

    return (
        <main className={classes.main}>
            <Grid className={classes.root} container>
                <Grid item>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            component="img" 
                            alt="portada"
                            image="images/staff/nosotros2.jpg" // {item.image}
                        />
                        <CardContent className={classes.cardContent}>
                          <div className={classes.cardContentHeader}>
                            <Typography gutterBottom variant="h5" component="div">
                                item.name item.lastname
                            </Typography>
                            <Typography gutterBottom variant="subtitle2" component="div">
                                Contacto: &nbsp; item.email
                            </Typography>
                            <Typography gutterBottom variant="subtitle2" component="div">
                                Rol: &nbsp; item.role
                            </Typography>
                          </div>
                          <Typography variant="body2" color="text.secondary">
                              item.description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                          </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </main>
    );
}

export default StaffPage;