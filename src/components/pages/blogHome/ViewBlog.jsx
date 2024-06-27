import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardPublicacion from '../blogAdmin/componentes/CardPublicacion'

const ViewBlog = () => {
    const [infoApi, setInfoApi] = useState([])
    const baseUrl = "http://localhost:8080"
    useEffect(() => {
        axios.get(`${baseUrl}/blogs`)
        .then(res => 
          setInfoApi(res.data)
        )
        .catch(err => console.log(err))
      }, [])

      console.log(infoApi)
  return (
    <div className='homePageBlog'>
        <div className='header'>
        <h1 className='title'>Leo Andino</h1>
      </div>
      <div className='itemCont'>
        <span className='titleBlog'>Bitacora de viajes</span>
        <div className='itemsblog'>
          {
            infoApi && infoApi.map((item, i) =>
            <div className='itemBlog' key={i}>
                <div className='textBlog'>
                  <h2 className='title'>{item.name}</h2>
                  <p className='description'>{item.description}</p>
                </div>
                
                
                
                {
                  item.publicacions.length===0
                  &&
                  
                  <span>{item.name} sin publicaciones</span>
                  ||
                  <div className='publicaciones'>
                    {
                    
                    item.publicacions.sort((a, b) => a.id - b.id).map((publicacion, i)=>(
                      <CardPublicacion
                      key={i}
                      publicacion={publicacion}
                      />
                    ))
                  }
                  </div>
                  

                }
            </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ViewBlog