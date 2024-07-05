import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Products from '../render/Products';


const ProductList = () => {
    const { product } = useParams();
    const [products, setproducts] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"))

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`https://ecom-backend-ten-gamma.vercel.app/product/fetchProducts/${product}`)
            if (response) {
                console.log(response)
                setproducts(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async (id) => {
        const config = {
          headers: {
            'authorization': `${userData.token}`
          }
        }
        try {
          const response = await axios.delete(`https://ecom-backend-ten-gamma.vercel.app/product/deleteProduct/${id}`, config)
          if (response) {
            console.log(response)
            fetchProducts();
          }
        } catch (error) {
          console.log(error)
        }
      }
    


    useEffect(() => {
        fetchProducts();
    }, [product])


    return (
        <>
            <h1 className='product_heading'>List of {product}s</h1>
            <div className='product-list'>
                {products.map((product, index) => (
                    <Products key={index}
                        name={product.name}
                        price={product.price}
                        deleteFuntion={() => deleteProduct(product._id)}
                    />
                ))}
            </div>
        </>
    )
}

export default ProductList