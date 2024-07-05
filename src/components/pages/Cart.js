import React, { useEffect, useState } from 'react'
import CartProduct from '../fixed/CartProduct'
import { useCart } from '../../globalState/globalState'
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from "axios"


const Cart = () => {
  const { cart, setCart, user } = useCart();
  const [totalAmount, settotalAmount] = useState(0)
  const [name, setname] = useState("")
  const [street, setstreet] = useState("")
  const [city, setcity] = useState("")
  const [state, setstate] = useState("")
  const [postal, setpostal] = useState("")
  const [showToast, setShowToast] = useState(false);
  const [toastmsg, settoastmsg] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotal = () => {
      const total = cart.reduce((acc, curr) => {
        acc += parseInt(curr.price) * curr.quantity
        return acc
      }, 0)
      settotalAmount(total)
    }
    calculateTotal();
  }, [cart])



  const addProduct = (id, value) => {
    const existingCart = localStorage.getItem("CartData");
    const cartArray = JSON.parse(existingCart);
    if (value === "Add") {
      cartArray.filter((x) => x._id === id)[0].quantity += 1;
    } else {
      const value = cartArray.filter((x) => x._id === id)
      if (value[0].quantity !== 1) {
        cartArray.filter((x) => x._id === id)[0].quantity -= 1;
      }
    }
    setCart(cartArray)
    localStorage.setItem("CartData", JSON.stringify(cartArray))
  }

  const deleteProduct = (id) => {
    const existingCart = localStorage.getItem("CartData");
    const cartArray = JSON.parse(existingCart);

    const updatedCart = cartArray.filter((x) => x._id !== id);
    setCart(updatedCart)
    localStorage.setItem("CartData", JSON.stringify(updatedCart))

  }

  const placeorder = async (e) => {
    e.preventDefault();
    const address = `${name}, ${street}, ${city}, ${state}, ${postal}`;
    const products = cart.reduce((acc, curr) => {
      acc.push({ product: curr._id, quantity: curr.quantity })
      return acc;
    }, [])
    const data = {
      address: address,
      products: products
    }
    const token = user.token;

    if (!user.name) {
      setShowToast(true);
      settoastmsg("Login to place order.")
      return;
    }

    if (cart.length === 0) {
      setShowToast(true);
      settoastmsg("Cart is empty.")
      return;
    }

    try {
      const config = {
        headers: {
          'authorization': token
        }
      };
      const response = await axios.post("https://ecom-backend-zlhk.onrender.com/order/placeOrder", data, config)
      if (response) {
        setname("")
        setstreet("")
        setcity("")
        setpostal("")
        setstate("")
        setCart([])
        localStorage.removeItem("CartData")
        navigate("/orders")
      }

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <section className='section_cart'>

      <ToastContainer position="middle-center" className="p-3">
        <Toast className='custom-toast' show={showToast} onClose={() => setShowToast(false)} delay={4000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Alert</strong>
          </Toast.Header>
          <Toast.Body>{toastmsg}</Toast.Body>
        </Toast>
      </ToastContainer>




      <div className='cart_left'>

        <div className='cart_scroll'>
          {user.name ? (
            <div className='cart_left__login'>{user.name} is logged in.</div>
          ) : (
            <div className='cart_left__login'>Login into your account to place order.<div onClick={() => navigate("/register")} className='cart_left__login__button'>Login</div></div>
          )}



          <div className='cart_left__products'>
            {cart.length !== 0 ? (
              cart.map((product, index) => (
                <CartProduct
                  key={index}
                  name={product.name.length > 15 ? product.name.slice(0, 12) + "..." : product.name}
                  price={product.price}
                  image={product.image}
                  quantity={product.quantity}
                  add={() => addProduct(product._id, "Add")}
                  sub={() => addProduct(product._id, "Sub")}
                  remove={() => deleteProduct(product._id)}
                />
              ))
            ) : <span className='cart_left__empty'>Add something to cart</span>}

          </div>

          <div className='cart_left__address'>
            <h1 className='cart_left__address__heading'>Deliver to</h1>


            <form className='address_form' onSubmit={placeorder}>

              <div className='address_form__container'>
                <label className='address_form__container__label'>Name :</label>
                <input
                  className='address_form__container__input'
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  required={true}
                ></input>
              </div>

              <div className='address_form__container'>
                <label className='address_form__container__label'>Street :</label>
                <input className='address_form__container__input'
                  onChange={(e) => setstreet(e.target.value)}
                  value={street}
                  required={true}
                ></input>
              </div>

              <div className='address_form__container'>
                <label className='address_form__container__label'>City :</label>
                <input className='address_form__container__input'
                  onChange={(e) => setcity(e.target.value)}
                  value={city}
                  required={true}
                ></input>
              </div>

              <div className='address_form__container'>
                <label className='address_form__container__label'>State :</label>
                <input className='address_form__container__input'
                  onChange={(e) => setstate(e.target.value)}
                  value={state}
                  required={true}
                ></input>
              </div>

              <div className='address_form__container'>
                <label className='address_form__container__label'>Postal code :</label>
                <input className='address_form__container__input'
                  onChange={(e) => setpostal(e.target.value)}
                  value={postal}
                  required={true}
                ></input>
              </div>

              <div className='cart_left__button'>
                <button type="submit" className='cart_left__button__button'>Place Order</button>
              </div>

            </form>

          </div>

        </div>



      </div>




      <div className='cart_right'>
        <div className='cart_right__heading'>Price Details</div>
        <div className='cart_right__product'>
          {cart.length !== 0 ? (
            cart.map((product, index) => (
              <div className='cart_right__product__detail' key={index}>
                <span className='cart_right__product__name'>{product.name.length > 15 ? product.name.slice(0, 12) + "..." : product.name}</span>
                <span className='cart_right__product__price'>₹ {product.price}  x  {product.quantity}</span>
              </div>
            ))
          ) : ""}

        </div>
        <div className='cart_right__total'><span className='cart_right__total__text'>Total Amount</span> ₹ {totalAmount}</div>
      </div>

    </section>


  )
}

export default Cart