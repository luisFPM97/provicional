import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ViewPublicacion = () => {
    const baseUrl = "https://leoandinobackend-1.onrender.com"
    const [publicacion, setPublicacion] = useState()
    const {id} = useParams();

    useEffect(() => {
      axios.get(`${baseUrl}/publicaciones/ `+ id)
      .then ( res => setPublicacion(res.data))
      .catch(err => console.log(err))
    }, [])

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
            <div className='contenido'>
                <p>{publicacion.descripcion}</p>
            </div>
            {
                publicacion.entradas 
                &&
                <div className='contenedorentradas'>
                    {
                        publicacion.entradas.sort((a, b) => a.id - b.id).map((entrada, index) =>
                            <div key={index} className='entrada' >
                                <span>{moment(entrada.createdAt).format('YYYY-MM-DD')}</span>
                                {
                                    entrada.imagens.length === 0
                                    &&
                                    <></>
                                    ||
                                    <div className='contenedorimagenes'>
                                        {
                                            entrada.imagens.map((imagen, i)=>(
                                                <div key={i} className='imagen'>
                                                    <img src={imagen.urlImagen} alt="" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                                {
                                    entrada.textos.length ===0
                                    &&
                                    <></>
                                    ||
                                    <div>
                                        {
                                            entrada.textos.map((texto, i)=>(
                                                <div key={i} className='texto'>
                                                    <span>{texto.contenido}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        )
                    }
                </div>
                
                ||
                <span>cargando</span>
            }
            </>
        }
    </div>
  )
}

export default ViewPublicacion