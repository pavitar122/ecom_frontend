import React from 'react'

const Products = ({name , price, deleteFuntion}) => {
  return (
    <div className='products'>
        <div className="product_detail">
        <span className='products__name'>Name: {name}</span>
        <span className='products__price'>Price: Rs {price}</span>
        </div>

        <div>
        <i className="bi bi-trash-fill products__delete" onClick={deleteFuntion} ></i>
        </div>
    
  </div>
  )
}

export default Products