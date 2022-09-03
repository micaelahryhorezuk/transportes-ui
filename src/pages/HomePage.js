import React from 'react';
import '../styles/components/pages/HomePage.css';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
    padding: '15px 15px 15px 15px',
    justifyContent: 'space-evenly',
  },
  cardItem: {
    width: '75vw',
    margin: '10px 10px 10px 10px',
  }
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <Grid className={classes.root} container>

        <Grid item>
          <Card>
            <CardMedia
              component="img"
              alt="portada"
              height="150"
              image="images/home/img01.jpg"
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Bienvenidos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <Card className={classes.cardItem}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Testimonios
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Usuario a: Simplemente excelente
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.cardItem}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Usuario b: Simplemente maravilloso
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.cardItem}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Usuario c: Simplemente maravilloso
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.cardItem}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Usuario d: Simplemente maravilloso
              </Typography>
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </main>
  );
}

export default HomePage;