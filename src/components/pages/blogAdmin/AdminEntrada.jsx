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
          setConsulta(true)
        )
      )
      .catch((err) => console.log(err));
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
            urlImagen: "",
          }),
          setConsulta(true)
        )
      )
      .catch((err) => console.log(err));
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
                    <span>
                      {moment(entrada.createdAt).format("YYYY-MM-DD")}
                    </span>
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
            <button type="submit">Aregar Entrada</button>
          </form>
          {showtypeents && (
            <div className="modalentrada">
              {dataentrada && (
                <input
                  type="text"
                  value={dataentrada.id}
                  name=""
                  id=""
                  readOnly
                  hidden
                />
              )}
              
              <select
                value={tipoContenido}
                onChange={(e) => setTipoContenido(e.target.value)}
              >
                <option className='bx bx-camera' value="0">Seleccionar</option>
                <option value="1">Imagen</option>
                <option value="2">Texto</option>
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
                  <input type="file" onChange={(e) => setImage(e.target.files[0])} />
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
              <button
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
