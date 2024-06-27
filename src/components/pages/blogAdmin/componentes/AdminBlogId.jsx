import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import HomeBlog from '../../blogHome/HomeBlog'

const AdminBlogId = ({ setUpdateInfo,updateInfo}) => {

    const [showAddBlog, setShowAddBlog] = useState(false)
    const { handleSubmit, register, reset, formState: { errors } } = useForm()
    const [dataBlogc, setDataBlogc] = useState()
    function showAdminB() {
        setShowAddBlog(prevState => !prevState)
    }
    const submit = data => {
        const url = `${baseUrl}/blogs`
        setShowAddBlog(prevState => !prevState)
        reset({
            name:' ',
            description:' '
        }),
        axios.post(url,data)
          .then(res => 
            console.log(res.data),
            setBlog([...blog, res.data]),            
          )
          .catch()
    }
    const baseUrl = "http://localhost:8080"
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
        <HomeBlog setDataBlog={setDataBlogc}/>
        <div className='agregarblog'>
           {
            dataBlogc 
            &&
            <></>
            ||
            <>
            <button className='btnaddb' onClick={showAdminB}>{showAddBlog && 'x' ||'Agregar Blog'}</button>
            {
                showAddBlog &&
                <div className='formulario'>
                    <form action="" onSubmit={handleSubmit(submit)}>
                        <input type="text" {...register("name")} placeholder="Titulo" name="name" required/>
                        <input type="text" {...register("description")} placeholder="Descripcion" name="description" required/>
                        <button type='submit'>Añadir Blog</button>
                    </form>
                </div>
            }
            </>
           }
        </div>
    </div>
  )
}

export default AdminBlogId