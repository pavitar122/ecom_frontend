import React, { useRef, useState } from 'react'
import CarouselHome from "../fixed/Carousel"
import axios from 'axios';
import { useEffect } from 'react';
import { useCart } from '../../globalState/globalState';
import Footer from '../fixed/Footer'
import Products from '../fixed/Products';


const Home = () => {
  const sectionProducts = useRef(null);
  const [category, setcategory] = useState("Headphone")
  const [products, setproducts] = useState([])
  const { setCart, user } = useCart();
  const [count, setcount] = useState(10)


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://ecom-backend-ten-gamma.vercel.app/product/fetchProducts/${category}`)
        if (response) {
          setproducts(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts();
  }, [category, user])


  const scrollToSection = (sectionRef, category) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    setcategory(category)
    setcount(10)
  };

  const nextPage = () => {
    if (count < products.length) {
      setcount(count + 10);
      sectionProducts.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const prevPage = () => {
    if (count > 10) {
      setcount(count - 10);
      sectionProducts.current.scrollIntoView({ behavior: 'smooth' });
    }
  }


  const addToCart = (product) => {
    const existingCart = localStorage.getItem("CartData");
    const cartArray = existingCart ? JSON.parse(existingCart) : [];
    const productFound = cartArray.filter((x) => x._id === product._id)

    if (productFound.length !== 0) {
      productFound[0].quantity += 1;
    } else {
      cartArray.push({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1
      });
    }

    setCart(cartArray)
    localStorage.setItem("CartData", JSON.stringify(cartArray))
  }

  

  return (
    <div className='home'>
      <CarouselHome />

      <div className='category-section'>
        <div className='hcard1' onClick={() => scrollToSection(sectionProducts, "Headphone")}>
          <h1 className='hcard1__heading'>20% Off On Haedphones</h1>
          <span className='hcard1__des'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.</span>
    
        </div>

        <div className='hcard2' onClick={() => scrollToSection(sectionProducts, "Earphone")}>
          <h1 className='hcard2__heading'>20% Off On Haedphones</h1>
          <span className='hcard2__des'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.</span>
    
        </div>

        <div className='hcard3' onClick={() => scrollToSection(sectionProducts, "Speaker")}>
          <h1 className='hcard3__heading'>20% Off On Haedphones</h1>
          <span className='hcard3__des'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.</span>
        </div>
      </div>


      <section className='section-products' ref={sectionProducts}>
        <div className='products-spacing'></div>
        <h1 className='category-products__heading'>Featured {category}s</h1>
        <div className='category-products'>
          {products.slice(count - 10, count).map((product, index) => (
            <Products key={index}
              image={product.image}
              name={product.name}
              price={product.price}
              addFunction={() => addToCart(product)}
            />
          ))}
        </div>
        <div className="button">
          <div className='button__btn' onClick={prevPage}>Back</div>
          <div className='button__btn' onClick={nextPage}>Next</div>
        </div>
      </section>



      <Footer />
    </div>
  )
}

export default Home