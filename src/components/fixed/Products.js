import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const Products = ({name , price, image, addFunction}) => {

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="product__message">
      Add to Cart
    </Tooltip>

  );
  return (
    <div className='product'>
      <img className='product__image' src={image} alt='Product'></img>
      <h1 className='product__des'>{name}</h1>
      <h2 className='product__price'>₹ {price}</h2>

      <OverlayTrigger
      placement="left"
      delay={{ show: 100, hide: 400 }}
      overlay={renderTooltip}
    >
      <i variant="success" className="bi bi-bag-check-fill product__button" onClick={addFunction}></i>
    </OverlayTrigger>

    </div>

  )
}

export default Products