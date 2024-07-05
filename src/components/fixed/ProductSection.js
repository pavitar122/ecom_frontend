import React from 'react'
import Products from './Products'

const ProductSection = () => {
  return (
    <>
    <h1 className='category-products__heading'>Featured Products</h1>
    <div className='category-products'>
      <Products/>
      <Products />
      <Products />
      <Products />
      <Products />
    </div>
    <div className="button">
      <div className='button__btn'>Back</div>
      <div className='button__btn'>Next</div>
    </div>
    </>
  )
}

export default ProductSection