import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import HomeBlog from '../../blogHome/HomeBlog'

const AdminBlogId = ({ setUpdateInfo,updateInfo}) => {

    const [showAddBlog, setShowAddBlog] = useState(false)
    const { handleSubmit, register, reset, formState: { errors } } = useForm()
    const [dataBlogc, setDataBlogc] = useState(undefined)
    function showAdminB() {
        setShowAddBlog(prevState => !prevState)
    }

    

    const submit = data => {
        const url = `${baseUrl}/blogs`
        location.reload()
        setShowAddBlog(prevState => !prevState)
        reset({
            name:' ',
            description:' '
        }),
        axios.post(url,data)
          .then(res => 
            console.log("carga exitosa"),
          )
          .catch()
          
    }
    const baseUrl = "https://leoandinobackend-1.onrender.com"
    useEffect(() => {
        axios.get(`${baseUrl}/blogs`)
            .then(res => 
                setDataBlogc(res.data)
            )
            .catch(err => console.log(err))
    }, [])

  return (
    <div className='adminblog'>
        <Link to="/admiBlog">
       <button className='btnHome'>Home</button>
      </Link>
        {
            dataBlogc
            &&
                <>
                    <HomeBlog setDataBlog={setDataBlogc}/>
                <div className='agregarblog'>
                {
                    dataBlogc.length === 0
                    &&
                    <>
                    <button className='btnaddb' onClick={showAdminB}>{showAddBlog && 'x' ||'Agregar Blog'}</button>
                    {
                        showAddBlog &&
                        <div className='formulario'>
                            <form action="" onSubmit={handleSubmit(submit)}>
                                <input type="text" {...register("name")} placeholder="Titulo" id="name"  required/>
                                <input type="text" {...register("description")} placeholder="Descripcion"  id="description" required/>
                                
                                <button type='submit'>Añadir Blog</button>
                            </form>
                        </div>
                    }
                    </>
                    ||
                    <>
                    
                    </>
                }
                </div>
                </>
            ||
                <>
                    <div>Cargando ...</div>
                </>
        }
    </div>
  )
}

export default AdminBlogId