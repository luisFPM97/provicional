import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [valorInput, setValorInput] = useState('');
  function showM() {
    setShowModal(prevState => !prevState)
  }
  function login(valorInput) {
    setShowModal(prevState => !prevState)
    window.localStorage.setItem('password', valorInput)
  }
  let length = valorInput.length

  return (
    <div className='inicio'>
      
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
        
        </div>
      

      <Link to="/blog"><button>Blog</button></Link>

      <div className='enter'>
          <button onClick={showM}>
            Administrar
          </button>
          {
            showModal &&
            <div className='modaling'>
              <div className='cardm'>
                <span>ingrese contraseña</span>
                <input type="password" value={valorInput} onChange={(e) => (setValorInput(e.target.value) )}/>
                {
                  valorInput === "leoandino"
                  &&
                  <Link to="/admiBlog">
                    <button onClick={showM}>
                      Ingresar
                      
                    </button>
                  </Link>
                  ||
                  <span>Contraseña incorrecta</span>
                }
              </div>
              <button onClick={login}>x</button>
            </div>
          }
          
      </div>
    </div>
  )
}

export default Home