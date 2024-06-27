import axios from 'axios'

import { useEffect, useState } from 'react';

const HomeBlog = ( ) => {
  const baseUrl = "http://localhost:8080"
  const [dataBlog, setDataBlog] = useState()
  const [showformp, setShowformp] = useState(false)
  useEffect(() => {
    axios.get(`${baseUrl}/blogs`)
    .then(res => 
      setDataBlog(res.data)
    )
    .catch(err => console.log(err))
  }, [])
  console.log(dataBlog)
  function changefshow() {
    setShowformp(prevState => !prevState)
  }
  
  return (
    <div className='homePageBlog'>
      <div className='header'>
        <h1 className='title'>Leo Andino</h1>
      </div>
      <div className='itemCont'>
        <span className='titleBlog'>Bitacora de viajes</span>
        <div className='itemsblog'>
          {
            dataBlog && dataBlog.map((item, i) =>
            <div className='itemBlog' key={i}>
                <div className='textBlog'>
                  <h2 className='title'>{item.name}</h2>
                  <p className='description'>{item.description}</p>
                </div>
                {
                  showformp && <></> || <button onClick={changefshow}>Agregar Artículo</button>
                }
                {
                  showformp &&
                  <div className='formularioPublicacion'>
                  <form action="">
                    <input type="text" placeholder='Nombre' />
                    <textarea name="description" placeholder='Descripcion del artículo' id=""></textarea>
                    <button type='submit' onClick={changefshow}>Agregar publicacion</button>
                  </form>
                </div>
                }
                {
                  dataBlog.publicacions
                  &&
                  <span>publicacion</span>
                  ||
                  <span>{item.name} sin publicaciones</span>

                }
            </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default HomeBlog