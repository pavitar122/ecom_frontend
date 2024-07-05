import React, { useEffect, useState } from 'react'
import Users from '../render/Users'
import axios from "axios";



const UserList = () => {
  const [users, setusers] = useState([])
  const userData = JSON.parse(localStorage.getItem("userData"))
  
  const fetchUsers = async () => {
    const config = {
      headers: {
        'authorization': `${userData.token}`
      }
    }
    try {
      const response = await axios.get("https://ecom-backend-zlhk.onrender.com/user/fetchUsers", config)
      if (response) {
        console.log(response)
        setusers(response.data.allUsers)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async (id) => {
    const config = {
      headers: {
        'authorization': `${userData.token}`
      }
    }
    try {
      const response = await axios.delete(`https://ecom-backend-zlhk.onrender.com/user/deleteUser/${id}`, config)
      if (response) {
        console.log(response)
        fetchUsers();
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers();
  },[])


  return (
    <>
      <h1 className='user_heading'>User List</h1>
      <div className='user-list'>
        {users.map((user, index) => (
          <Users key={index}
            name={user.name}
            deleteFuntion={() => deleteUser(user._id)} />
        ))}

      </div>
    </>
  )
}

export default UserList