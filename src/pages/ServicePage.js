import React from 'react'

function ServicePage() {
  return (
    <section className="holder">
        <h2>Servicios</h2>
        <div className="servicios">
            <div className="servicio">
                <div className="holder-image left">
                    <img src='images/servicios/ferroviario.jpg' width={75} alt="Ferroviario"/>
                </div>
                <h5>Transporte Ferroviario</h5>
                <hr></hr>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div className="servicio">
                <div className="holder-image left">
                    <img src='images/servicios/aereo.jpg' width={75} alt="Ferroviario"/>
                </div>
                <h5>Transporte Aereo</h5>
                <hr></hr>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div className="servicio">
                <div className="holder-image right">
                    <img src='images/servicios/maritimo.jpg' width={75} alt="Maritimo"/>
                </div>
                <h5>Transporte Maritimo</h5>
                <hr></hr>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
        </div>
    </section>
  )
}

export default ServicePage