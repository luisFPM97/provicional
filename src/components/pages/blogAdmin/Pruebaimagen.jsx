import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useImage } from 'react-image'; 

const Pruebaimagen = () => {
    const [value, setValue] = useState('');
    const [dataimagen, setDataimagen] = useState('')
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];

      const module = {
        toolbar: toolbarOptions,
      }

      useEffect(() => {
        console.log(value)
      }, [])
      console.log(value)
      /* prueba imagen react-imagen*/
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
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
  return (
    <div>
        <ReactQuill modules={module} theme="snow" value={value} onChange={setValue} />
        <div  dangerouslySetInnerHTML={{ __html: value }} />
        <input type="file" accept="image/jpeg" onChange={handleChange} />
        <img src={dataimagen} alt="" />
        <img src="https://drive.usercontent.google.com/download?id=18bnp-UncUWtK-Hyc7tHozKIUX0TokTi9&export=view" alt="" width={300} height={300}/>
        
    </div>
  )
}

export default Pruebaimagen