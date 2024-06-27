import React from 'react'
import Home from '../../Home'
import HomeBlog from '../blogHome/HomeBlog'
import { Link } from 'react-router-dom'

const AdminBlog = () => {
  return (
    <div className='homeBlog'>
      
      <HomeBlog/>
      <Link to="/admiBlogLeoAndino">
        <button className='btnAdmin'>Administrar</button>
      </Link>
    </div>
  )
}

export default AdminBlog