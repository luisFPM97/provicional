import React, { useEffect } from 'react'
import Home from '../../Home'
import HomeBlog from '../blogHome/HomeBlog'
import { Link } from 'react-router-dom'
import ViewBlog from '../blogHome/ViewBlog'

const AdminBlog = () => {

  const password = window.localStorage.getItem('password')
  useEffect(() => {

    if (!password){
      window.location.href = '/'
    }

  }, [])
  

  return (
    <div className='homeBlog'>
      
      <ViewBlog/>

      {
        password === 'leoandino'
        &&
          <Link to="/admiBlogLeoAndino">
          <button className='btnAdmin'>Administrar</button>
          </Link>
        ||
          <></>
      }
    </div>
  )
}

export default AdminBlog