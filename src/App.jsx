import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomeBlog from './components/pages/blogHome/HomeBlog';
import Home from './components/Home';
import AdminBlog from './components/pages/blogAdmin/AdminBlog';
import AdminBlogId from './components/pages/blogAdmin/componentes/AdminBlogId';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ViewBlog from './components/pages/blogHome/ViewBlog';
import AdminEntrada from './components/pages/blogAdmin/AdminEntrada';
import ViewPublicacion from './components/pages/blogAdmin/ViewPublicacion';
import Pruebaimagen from './components/pages/blogAdmin/Pruebaimagen';


function App() {
  const [blog, setBlog] = useState()
  const [updateInfo, setUpdateInfo] = useState(true)
  const baseUrl = "https://leoandinobackend-1.onrender.com"
  
  useEffect(() => {
    axios.get(`${baseUrl}/blogs`)
    .then(res => setBlog(res.data))
    .catch(err => console.log(err))
    }, [])
  
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/blog" element={<ViewBlog/>} />
        <Route path='/admiBlog' element={<AdminBlog />} />
        <Route path='/admiBlogLeoAndino' element={<AdminBlogId baseUrl={baseUrl} setBlog={setBlog} blog={blog} setUpdateInfo={setUpdateInfo} updateInfo={updateInfo}/>} />
        <Route path='/entrada/:id' element={<AdminEntrada/>}/>
        <Route path='/publicacion/:id' element={<ViewPublicacion/>}/>
        <Route path='/prueba'  element={<Pruebaimagen/>}/>
      </Routes>
    </div>
  )
}

export default App
