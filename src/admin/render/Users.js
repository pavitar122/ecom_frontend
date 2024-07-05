
import React from 'react'

const Users = ({name, deleteFuntion}) => {
  return (
    <div className='users'>
      <span className='users__name'>{name}</span>
      <i className="bi bi-trash-fill users__delete" onClick={deleteFuntion}></i>
    </div>
  )
}

export default Users