import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
    </>
  )
}

export default App
