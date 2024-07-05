import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const AddProduct = () => {
  const { product } = useParams();
  const [loading, setloading] = useState(false)
  const [name, setname] = useState("")
  const [price, setprice] = useState("")
  const [image, setimage] = useState("")
  const userData = JSON.parse(localStorage.getItem("userData"))
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file)
  };

  const handleImageUpload = async (photo) => {
    setloading(true)
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', 'chat_app');
    formData.append('folder', 'products');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dflkzguu6/image/upload',
        formData
      );
      if (response) {
        console.log(response.data.url)
        setimage(response.data.url)
        setloading(false)
      }
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };


  const handleSubmit = async () => {
    const config = {
      headers: {
        'authorization': `${userData.token}`
      }
    };

    let productData = {
      name,
      price
    }
    if (image) {
    productData.image = image;
    } 

  try {
    const response = await axios.post(`https://ecom-backend-ten-gamma.vercel.app/product/addProduct/${product}`, productData, config);
    if (response) {
      console.log(response);
      setname("")
      setprice("")
      setimage("")
      navigate(`/admin/productList/${product}`)

    }
  } catch (error) {
    console.log('Error adding product:', error);
  }
};



return (
  <>
    <h1 className='addProduct__heading'>Add {product}</h1>
    <div className='addProduct'>
      <div className='addProduct__form-container'>
        <div className='addProduct__form-container__form'>

          <label className='addProduct__form-container__form__label'>Name:</label>
          <input value={name} onChange={(e) => setname(e.target.value)} className='addProduct__form-container__form__input' type='text' placeholder='Name of the Product'></input>

          <label className='addProduct__form-container__form__label'>Price:</label>
          <input value={price} onChange={(e) => setprice(e.target.value)} className='addProduct__form-container__form__input' type='text' placeholder='Price of the Produce'></input>


          <label className='addProduct__form-container__form__label'>Image:</label>
          {loading === true ? (<Spinner animation="grow" />) : (
            <>
              {image ? <span className='tick'>Uploaded &#10004;</span> : <input onChange={handleFileChange} className='addProduct__form-container__form__image' type='file' ></input>}
            </>
          )}



          <div onClick={handleSubmit} className='addProduct__form-container__form__button'>Add {product}</div>

        </div>

      </div>
    </div>

  </>

)

}
export default AddProduct