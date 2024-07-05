import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <div className='footer'>All rights reserved {currentYear}</div>
  )
}

export default Footer