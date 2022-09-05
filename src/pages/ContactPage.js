import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
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
    alignItems: 'center',
    justifyContent: 'space-evenly',
    columnGap: '1em'
  },
  child: {},
  form: {
    width: '40vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: '1em'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    gap: '1em'
  },
}));

const ContactPage = () => {
  const classes = useStyles();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const otherContact = {
    telefono: 'xxxx-xxxxxx',
    email: 'some@example.com',
    facebook: 'www.facebook.com/example',
    twitter: 'www.twitter.com/example',
    skype: 'www.skype.com/example',
    instagram: 'www.instagram.com/example',
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.warn(form);
  }

  return (
    <main className={classes.main}>
      <Grid className={classes.root} container>
        <Grid className={classes.child} item>
          <form className={classes.form}>
            <TextField fullWidth type="text" label="Nombre" defaultValue="" onChange={(e) => setForm({...form, nombre: e.target.value})}/>
            <TextField fullWidth type="email" placeholder="@example.com" label="Email" defaultValue="" onChange={(e) => setForm({...form, email: e.target.value})}/>
            <TextField fullWidth type="text" label="Telefono" defaultValue="" onChange={(e) => setForm({...form, telefono: e.target.value})}/>
            <TextField fullWidth type="text" multiline label="Mensaje" defaultValue="" onChange={(e) => setForm({...form, mensaje: e.target.value})}/>
            <Button type="submit" variant="contained" color="primary" onClick={onSubmit}>Enviar</Button>
          </form>
        </Grid>
        <Grid className={classes.child} item>
          <div className={classes.info}>
            <Typography variant="body1"><b>Teléfono:</b> &nbsp; {otherContact.telefono}</Typography>
            <Typography variant="body1"><b>Email:</b> &nbsp; {otherContact.email}</Typography>
            <Typography variant="body1"><b>Facebook:</b> &nbsp; {otherContact.facebook}</Typography>
            <Typography variant="body1"><b>Twitter:</b> &nbsp; {otherContact.twitter}</Typography>
            <Typography variant="body1"><b>Skype:</b> &nbsp; {otherContact.skype}</Typography>
            <Typography variant="body1"><b>Instagram:</b> &nbsp; {otherContact.instagram}</Typography>
          </div>
        </Grid>
      </Grid>
    </main>
  );
}

export default ContactPage;