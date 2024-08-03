import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [valorInput, setValorInput] = useState('');
  const navigate = useNavigate();
  function showM() {
    setShowModal(prevState => !prevState)
  }
  useEffect(() => {
    console.log(valorInput)
  }, [])
  

  function login(valorInput) {
    setShowModal(prevState => !prevState);
    window.localStorage.setItem('password', 'leoandino'); 
    navigate('/admiBlog')
  }
  console.log(valorInput)

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
    
    <div className='contenedorhome'>

      <Link className='blog'to="/blog">
        <span>BITÁCORA DE VIAJES</span>
      </Link>
      
      <Link className='cv'>
          <span>CONOCE MÁS SOBRE MI</span>
          <span> cv - publicaciones</span>
      </Link>

    </div>

      <div className='enter'>
        <button onClick={showM}>INICIAR SESIÓN</button>
        {showModal && (
          <div className='modaling'>
            <div className='cardm'>
              <span className='pass'>Ingrese contraseña</span>
              <input type="password" value={valorInput} onChange={(e) => setValorInput(e.target.value)} />
              {valorInput === "leoandino" && (
                <button onClick={login}>Ingresar</button>
              )}
              {valorInput !== "leoandino" && <span>Contraseña incorrecta</span>}
            </div>
            <button className='x' onClick={showM}>x</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home