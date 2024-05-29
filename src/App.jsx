import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import moment from 'moment'; // Importar librería Moment.js


function App() {
  const [count, setCount] = useState(0)
  const [fechaActual, setFechaActual] = useState(moment());
const [fechaObjetivo, setFechaObjetivo] = useState(moment('2024-06-29 12:00:00'));



 let date
 let minutes
 let segundos

useEffect(() => {
  let meses
  const intervalId = setInterval(() => {
    /*setFechaActual(moment());*/
    date = new Date()
    minutes = 60-date.getMinutes()
    segundos = 60-date.getSeconds()
    console.log(segundos)
  }, 1000); // Actualizar cada segundo (1000 milisegundos)
   // Limpiar el intervalo al desmontar el componente
}, []);

  return (
    <>
      <div className='card'>
        <div className='img'><img src="/img/leo.png" alt="" /></div>
        <div className='info'>
          <h1>José Leonardo Henao Giraldo</h1>
          <h2>Investigador e Historiador</h2>
          <span>
            <a href="https://co.linkedin.com/in/jose-leonardo-henao-giraldo-962970245" target='blank'>
              <i className='bx bxl-linkedin bx-burst-hover' ></i>
            </a>
          </span>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className='construccion'>
      <i class='bx bxs-error bx-flashing'></i>
      <span>Proximamente sitio web</span>
      </div>
      <div className="tiempo-restante">
      <span>Tiempo restante hasta el 29 de junio de 2024 a las 12 del mediodía:</span>
      <span>{segundos} segundos</span>
    </div>
    </>
  )
}

export default App
