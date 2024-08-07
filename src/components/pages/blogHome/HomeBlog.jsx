import axios from 'axios'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CardPublicationAdmin from '../blogAdmin/componentes/CardPublicationAdmin';


const HomeBlog = ( ) => {
  const baseUrl = "https://leoandinobackend-1.onrender.com"
  const [dataBlog, setDataBlog] = useState()
  const [idBlog, setIdBlog] = useState()
  const [showformp, setShowformp] = useState(undefined)
  const { handleSubmit, register, reset, formState: { errors } } = useForm()
  const [cargarpubli, setCargarpubli] = useState(true)
  
 
  useEffect(() => {
  
      console.log(showformp)
      axios
      .get(`${baseUrl}/blogs`)
      .then(res => 
        setDataBlog(res.data),
        setCargarpubli(false)
      )
      .catch(err => console.log(err))
    
  }, [])

  const changefshow=(id) =>{
    setShowformp(true)
    setIdBlog(id)
  }
  function closeshowf() {
    setShowformp(false)
  }

  const postpublic = data => {
    
    data.imagen = "https://cdn.pixabay.com/photo/2023/04/24/03/16/camping-7947056_1280.jpg"
    const url = `${baseUrl}/publicaciones`
    
    axios.post(url,data)
      .then(res => 
        console.log("carga exitosa"), 
        setIdBlog(undefined),  
        reset({
          titulo:' ',
          descripcion:' '
        })
        
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
                    <input className='plcf' type="text" name="titulo" {...register("titulo")} placeholder='Nombre del viaje' required/>
                    <textarea className='plcf descf' type="text" name="descripcion" {...register("descripcion")} placeholder='Descripción del viaje'  required/>
                    <input className='plcf' type="text" {...register("imagen")} placeholder='url de la imagen' name='imagen' />
                    <span className='aviso'>*La imagen no es de uso obligatorio, se asigna una por defecto*</span>
                    <input type="text" value={item.id} {...register("blogId")} readOnly hidden/>
                    <button  type='submit' >Agregar publicacion</button>
                  </form>
                  <button className='btnxp' onClick={closeshowf}>x</button>
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
                      <CardPublicationAdmin
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