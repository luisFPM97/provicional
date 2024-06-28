import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AdminEntrada = () => {
    const baseUrl = "https://leoandinobackend.onrender.com"
    const [publicacion, setPublicacion] = useState()
    const {id} = useParams();
    console.log(id)
    useEffect(() => {
      axios.get(`${baseUrl}/publicaciones/ `+ id)
      .then ( res => setPublicacion(res.data))
      .catch(err => console.log(err))
    }, [])
    console.log(publicacion)
    
  return (
    <div className='adminPublicacion'  >
        {
            publicacion &&
            <>
            <div className="header" >
            <h1 className='title'>{publicacion.titulo}</h1>
            {
                publicacion.imagen &&
                <img src={publicacion.imagen} alt="" />
            }
            </div>
            <span>Entradas {publicacion.titulo}</span>
            <button>Aregar Entrada</button>
            </>
        }
    </div>
  )
}

export default AdminEntrada