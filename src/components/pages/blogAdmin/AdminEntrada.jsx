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

  console.log(publicacion);
  console.log(showtypeents);

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


  function convertImageToBase64(imageFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = (event) => {
        const base64Data = event.target.result;
        const contentType = base64Data.split(',')[0];
        const base64EncodedData = base64Data.split(',')[1];
        
        // Check if the image is JPG
        if (contentType.indexOf('image/jpeg') !== -1) {
          resolve(`data:image/png;base64,${base64EncodedData}`);
        } else {
          reject(new Error('Invalid image format. Please upload a JPG image.'));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  }
  
  // Example usage in React component
  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    convertImageToBase64(selectedFile)
      .then((base64Image) => {
        // Set the base64Image to a state variable or use it directly
        setDataimagen(base64Image);
        console.log(dataimagen.length)
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const addimagen = (data) => {

    console.log(data);
    const url = `${baseUrl}/imagenes`;
    if (consulta) {
      setConsulta(false);
    }
    axios.post(url, data)
      .then(
        (res) => (
          console.log(res.data),
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
                    {(entrada.imagens.length === 0 && <></>) || (
                      <div className="contenedorimagenes">
                        {entrada.imagens
                          .sort((a, b) => a.id - b.id)
                          .map((imagen, i) => (
                            <div key={i} className="imagen">
                              <img src={imagen.urlImagen} alt="" />
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
                />
              )}
              <select
                value={tipoContenido}
                onChange={(e) => setTipoContenido(e.target.value)}
              >
                <option value="0">Seleccionar tipo entrada</option>
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
                    id=""
                    readOnly
                    hidden
                  />
                  <input
                    type="text"
                    accept="image/jpeg"
                    {...register("urlImagen")}
                    name="urlImagen"
                    placeholder="url de la imagen"
                    onChange={handleChange}
                  />
                  <input type="text" value={dataimagen} hidden/>
                  <img src={dataimagen} alt=""  hidden/>
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
                    id=""
                    readOnly
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
