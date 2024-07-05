import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../globalState/globalState';

const Navbar = () => {
  const { cart, setUser, user } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData")
    setUser([])
    navigate("/")
  }



  const quantity = cart.map((x)=> x.quantity).reduce((acc, curr)=>{
    acc = curr + acc
    return acc;

  },0 )


  return (
    <div className='navbar'>
      <div className='navbar__logo' onClick={() => navigate("/")}>
        <i className="bi bi-earbuds navbar__logo__logo"></i>
        <h1 className='navbar__logo__name'>DigitalDash</h1>
      </div>

      <div className='navbar__right'>

        {user.name === "admin"? (
          <h1 className='navbar__right__login' onClick={() => navigate("/admin")}>Admin Dashboard</h1>
        ): (
          <h1 className='navbar__right__login' onClick={() => navigate("/orders")}>{user.name}</h1>
        )}

        {user.name ? (
          <h1 className='navbar__right__login' onClick={handleLogout}>Logout</h1>
        ) : (
          <h1 className='navbar__right__login' onClick={() => navigate("/register")}>Login</h1>
        )}

        <div className={'navbar__right__cart__number' + (cart.length === 0 ? " hideCart": "")}>{quantity}</div>
        <i className="bi bi-cart2 navbar__right__cart" onClick={() => navigate("/cart")}></i>
      </div>


    </div>
  )
}

export default Navbar