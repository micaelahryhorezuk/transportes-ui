import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
    padding: '15px 15px 15px 15px',
    justifyContent: 'space-evenly',
    columnGap: '1em'
  },
  header: {},
  headerCard: {},
  headerCardMedia: {
    maxWidth: '100vw',
    maxHeight: '30vh',
    objectFit: 'cover',
    display: 'flex',
    alignItems: 'center',
    margin:'0 !important',
  },
  headerCardContent: {},
  body: {},
  bodyCard: {
    width: '95vw',
    display: 'flex',
    direction: 'column',
    margin: '15px 15px 15px 15px',
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <Grid className={classes.root} container>

        <Grid className={classes.header} item>
          <Card className={classes.headerCard}>
            <CardMedia
              className={classes.headerCardMedia}
              component="img"
              alt="portada"
              image="images/home/img01.jpg"
            />
            <CardContent className={classes.headerCardContent}>
              <Typography gutterBottom variant="h5" component="div">
                Servicio
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid className={classes.body} item>
          <Card className={classes.bodyCard}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Testimonios
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Usuario a: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.bodyCard}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Usuario b: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.bodyCard}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Usuario c: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.bodyCard}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Usuario d: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </Typography>
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </main>
  );
}

export default HomePage;