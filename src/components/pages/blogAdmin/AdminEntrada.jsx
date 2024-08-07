import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";



const AdminEntrada = () => {
  const baseUrl = "https://leoandinobackend-1.onrender.com";
  const password = window.localStorage.getItem("password");
  const [publicacion, setPublicacion] = useState();
  const [dataentradas, setDataentradas] = useState(undefined);
  const [showtypeents, setShowtypeents] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showImagen, setShowImagen] = useState(false);
  const [consulta, setConsulta] = useState(true);
  const [tipoContenido, setTipoContenido] = useState("0");
  const [dataentrada, setDataentrada] = useState(undefined);
  const [dataimagen, setDataimagen] = useState('')
  const [image, setImage] = useState(null);
  const [entradaId, setEntradaId] = useState();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const { id } = useParams();

  
  
  useEffect(() => {
    if (!password) {
      window.location.href = "/";
    }
    if (consulta) {
      console.log("se hizo la consulta");
      axios
        .get(`${baseUrl}/publicaciones/ ${id}`)
        .then((res) => setPublicacion(res.data))
        .catch((err) => console.log(err));
    }
  }, [consulta]);

  
  
  const submit = (data) => {
    console.log(data);
    const url = `${baseUrl}/entradas`;
    axios
      .post(url, data)
      .then(
        (res) => setDataentrada(res.data),
        setShowtypeents(true),
        setConsulta(false)
      )
      .catch((err) => console.log(err));
  };
  const addtexto = (data) => {
    const url = `${baseUrl}/textos`;
    console.log(data);
    if (consulta) {
      setConsulta(false);
    }
    axios.post(url, data)
      .then(
        (res) => (
          console.log(res.data),
          reset({
            contenido: "",
          }),
          setShowtypeents(false),
          setConsulta(true),
          alert("texto agregada"),
          location.reload()
        )
      )
      .catch((err) => console.log(err));
  };
  const addvideo = (data) => {
    let urlvideo = data.url
    // Expresión regular para extraer el ID y los parámetros
    urlvideo = urlvideo.replace('youtu.be', 'www.youtube.com/embed');
    urlvideo = urlvideo.replace('watch?v=', 'embed/');

 
  data.url = urlvideo;
  console.log(data.url)
    const url = `${baseUrl}/videos`;
    console.log(data);
    if (consulta) {
      setConsulta(false);
    }
    axios.post(url, data)
      .then(res=>console.log(res.data), reset({url: " "}),setShowtypeents(false), setConsulta(true),alert("Video agregado"),)
      .catch(err=>console.log(err))
  };
  const addimagen = (e,data) => {
      console.log(data.target[0].value)
      const formData = new FormData();
      formData.append('image', image);
      formData.append('entradaId', data.target[0].value);
    
    const url = `${baseUrl}/imagenes`;
    if (consulta) {
      setConsulta(false);
    }
    axios.post(url,  formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  })
      .then(
        (res) => (
          console.log("imagen subida"),
          reset({
            file: "",
          }),
          setShowtypeents(false),
          setConsulta(true),
          alert("Imagen agregada"),
          location.reload()
        )
      )
      .catch((err) => console.log(err));
  };
  const deleteent = (id) => {
    console.log(id)
    axios.delete(`${baseUrl}/entradas/${id}`)
      .then((res) => console.log(res.data),setShowtypeents(false), alert(`usted elimino la entrada ${id}`), location.reload())
      .catch(err=>console.log(err))
  };

  return (
    <div className="adminPublicacion">
      {publicacion && (
        <>
          <div className="header">
            <h1 className="title">{publicacion.titulo}</h1>
            {publicacion.imagen && <img src={publicacion.imagen} alt="" />}
          </div>
          <div className="contenido">
            <p>{publicacion.descripcion}</p>
          </div>
          <span>Entradas {publicacion.titulo}</span>
          {(publicacion.entradas && (
            <div className="contenedorentradas">
              {publicacion.entradas
                .sort((a, b) => a.id - b.id)
                .map((entrada, index) => (
                  <div key={index} className="entrada">
                    <hr className="horizontalline" />
                    
                    <span className="fecha">
                      {moment(entrada.createdAt).format("YYYY-MM-DD HH:mm")}   
                      <i class='bx bx-trash'  onClick={() => deleteent(entrada.id)}></i>
                    </span>
                    {
                      (entrada.videos.length === 0 && <></>)||(
                        <div className="contenedorvideos">
                          {
                            entrada.videos
                            .sort((a, b) => a.id - b.id)
                            .map((video, i) => (
                              <div key={i} className="video">
                                  <iframe className="videoc"  height="480" src={`${video.url}`}   ng-show="showvideo" ></iframe>
                              </div>
                            ))
                          }
                        </div>
                      )
                    }
                    {(entrada.images.length === 0 && <></>) || (
                      <div className="contenedorimagenes">
                        {entrada.images
                          .sort((a, b) => a.id - b.id)
                          .map((imagen, i) => (
                            <div key={i} className="imagen">
                              <img src={imagen.url} alt="" />
                            </div>
                          ))}
                      </div>
                    )}
                    {(entrada.textos.length === 0 && <></>) || (
                      <div>
                        {entrada.textos
                          .sort((a, b) => a.id - b.id)
                          .map((texto, i) => (
                            <div key={i} className="texto">
                              <span>{texto.contenido}</span>
                            </div>
                          ))}
                      </div>
                    )}
                    
                  </div>
                ))}
                
            </div>
          )) || <span>cargando</span>}
          <br />
          <form
            className="formEntrada"
            action=""
            onSubmit={handleSubmit(submit)}
          >
            <input
              className="inputforment"
              type="text"
              value={id}
              {...register("publicacionId")}
              name="publicacionId"
              readOnly
            />
            <button className="addent" type="submit">Aregar Entrada</button>
          </form>
          {showtypeents && (
            <div className="modalentrada">
              {dataentrada && (
                <>
                <input
                  type="text"
                  value={dataentrada.id}
                  name=""
                  id=""
                  readOnly
                  hidden
                />
                
                </>
              )}
              
              <select
                value={tipoContenido}
                onChange={(e) => setTipoContenido(e.target.value)}
              >
                <option  value="0">Seleccionar</option>
                <option value="1">Imagen</option>
                <option value="2">Texto</option>
                <option value="3">Video</option>
              </select>

              {tipoContenido === "1" && (
                <form
                  className="formti"
                  action=""
                  onSubmit={handleSubmit(addimagen)}
                >
                  <input
                    type="text"
                    value={dataentrada.id}
                    {...register("entradaId")}
                    name="entradaId"
                    hidden
                  />
                  <input type="file" onChange={(e) => setImage(e.target.files[0])} name="file"/>
                  <input type="text" value={dataentrada.id} onChange={(e) => setEntradaId(dataentrada.id)} {...register("entradaId")} hidden/>
                  <button type="submit">Agregar</button>
                </form>
              )}
              {tipoContenido === "2" && (
                <form
                  className="formti"
                  action=""
                  onSubmit={handleSubmit(addtexto)}
                >
                  <input
                    type="text"
                    value={dataentrada.id}
                    {...register("entradaId")}
                    name="entradaId"
                    hidden
                  />
                  <textarea
                    {...register("contenido")}
                    placeholder="texto de entrada"
                    name="contenido"
                  />
                  <button type="submit">Agregar</button>
                </form>
              )}
              {tipoContenido === "3" && (
                <div className="entradavideo">
                  <br />
                  <button className="btnvideo"> <a href="https://studio.youtube.com/channel/" target="blank">Subir video</a><i className='bx bxl-youtube'></i></button>
                  <br />
                  <form className="formvideo" action="" onSubmit={handleSubmit(addvideo)}>
                  <input
                    type="text"
                    value={dataentrada.id}
                    {...register("entradaId")}
                    name="entradaId"
                    hidden
                  />
                    <input type="text"  placeholder="Link de video youtube" {...register("url")}/>
                    <button type="submit">Agregar</button>
                  </form>
                  <br />
                </div>
                
              )}
              <button className="btnsent"
                onClick={() => (setShowtypeents(false), location.reload())}
              >
                Terminar entrada
              </button>
              
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminEntrada;
