import React from 'react'
import Home from '../../Home'
import HomeBlog from '../blogHome/HomeBlog'
import { Link } from 'react-router-dom'
import ViewBlog from '../blogHome/ViewBlog'

const AdminBlog = () => {
  return (
    <div className='homeBlog'>
      
      <ViewBlog/>
      <Link to="/admiBlogLeoAndino">
        <button className='btnAdmin'>Administrar</button>
      </Link>
    </div>
  )
}

export default AdminBlog