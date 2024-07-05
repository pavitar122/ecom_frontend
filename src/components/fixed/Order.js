import React from 'react'

const Order = ({image, name, address, quantity, price}) => {
  return (
    <div className='o-component'>
        <img className='o-component__image' src={image} alt='Product'></img>
        <div className='o-component__details'>
            <span className='o-component__name'>{name} <span className='o-component__address'>{address}</span></span>
            <span className='o-component__price'>₹ {price} <span className='o-component__quantity'>Qunatity {quantity}</span></span>
            <span className='o-component__status'>Your order has been placed.</span>
        </div>
    </div>
  )
}

export default Order