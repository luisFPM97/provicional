import axios from 'axios'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CardPublicacion from '../blogAdmin/componentes/CardPublicacion';

const HomeBlog = ( ) => {
  const baseUrl = "https://leoandinobackend.onrender.com"
  const [dataBlog, setDataBlog] = useState()
  const [showformp, setShowformp] = useState(false)
  const { handleSubmit, register, reset, formState: { errors } } = useForm()
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
  const postpublic = data => {
    data.blogId = 1
    const url = `${baseUrl}/publicaciones`
    
    axios.post(url,data)
      .then(res => 
        console.log(res.data),            
      )
      .catch(err => console.log(err))
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
                  <form action="" onSubmit={handleSubmit(postpublic)}>
                    <input type="text" {...register("titulo")} placeholder='Nombre' name='titulo' required/>
                    <input type="text" name="descripcion" {...register("descripcion")} placeholder='Descripcion del artículo'  required/>
                    <input type="text" {...register("imagen")} placeholder='url de la imagen' name='imagen' required/>
                    <button  type='submit' >Agregar publicacion</button>
                  </form>
                </div>
                }
                
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

export default HomeBlog