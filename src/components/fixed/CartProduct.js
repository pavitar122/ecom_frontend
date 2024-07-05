import React from 'react'

const CartProduct = ({image, name, price, quantity, add, sub, remove }) => {
  return (
    <div className='cartProduct'>
        <img className='cartProduct__image' src={image} alt='product'></img>
        <div className='cartProduct__flex'>
        <span className='cartProduct__name'>{name}</span>
        <span className='cartProduct__price'>Price: {price} </span>
        <span className='cartProduct__quantity'><div className='cartProduct__quantity__button' onClick={sub} >-</div>{quantity}<div className='cartProduct__quantity__button' onClick={add}>+</div></span>
        <i className="bi bi-x-circle cartProduct__delete" onClick={remove}></i>
        </div>
        
    </div>
  )
}

export default CartProduct