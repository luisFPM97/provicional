import React from 'react'
import { useNavigate } from 'react-router-dom';

const CardPublicationAdmin = ({publicacion}) => {
    const navigate = useNavigate();
    console.log(publicacion)
  return (
    <div className='cardpublicacion' onClick={()=>navigate(`/entrada/${publicacion.id}`)}>
        <img src={publicacion.imagen} alt="" />
        <h1>{publicacion.titulo}</h1>
        <p>{publicacion.descripcion}</p>
    </div>
  )
}

export default CardPublicationAdmin