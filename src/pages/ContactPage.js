import React, { useState } from 'react';
import '../styles/components/pages/ContactoPage.css';

const ContactPage = () => {

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(form);
  }

  return (
    <main className="main">
      <div className="columna contacto">
        <h2>Complete el siguiente formulario</h2>
        <form action={'submit'} method='' className='formulario'>
          <p>
            <label>Nombre</label>
            <input type="text" name="nombre" onChange={(e) => setForm({...form, nombre: e.target.value})}/>
          </p>
          <p>
            <label>Email</label>
            <input type="email" name="email" onChange={(e) => setForm({...form, email: e.target.value})}/>
          </p>
          <p>
            <label>Telefono</label>
            <input type="text" name="telefono" onChange={(e) => setForm({...form, telefono: e.target.value})}/>
          </p>
          <p>
            <label>Comentario</label>
            <textarea name="mensaje" onChange={(e) => setForm({...form, mensaje: e.target.value})}/>
          </p>
          <p className="centrar">
            <input type="submit" value="Enviar" onClick={(e) => handleSubmit(e)}/>
          </p>
        </form>
      </div>
      <div className="columna datos">
        <h2>Otras vias de contacto</h2>
        <p>Tambien puede contactarse con nosotros usando los siguientes medios: </p>
        <ul>
          <li>{`Teléfono: ${otherContact.telefono}`}</li>
          <li>{`Email: ${otherContact.email}`}</li>
          <li>{`Facebook: ${otherContact.facebook}`}</li>
          <li>{`Twitter: ${otherContact.twitter}`}</li>
          <li>{`Skype: ${otherContact.skype}`}</li>
          <li>{`Instagram: ${otherContact.instagram}`}</li>
        </ul>
      </div>
    </main>
  );
}

export default ContactPage;