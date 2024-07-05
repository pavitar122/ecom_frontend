import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../globalState/globalState';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';





const Register = () => {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [cpassword, setcpassword] = useState("")
  const {setUser} = useCart();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastmsg, settoastmsg] = useState("")


  const handleRegister = async(e)=>{
    e.preventDefault(); 
    try {
      const response = await axios.post("https://ecom-backend-zlhk.onrender.com/user/register",{
        name, email, password, cpassword
      })

      if(response){
        console.log(response)
        navigate('/')
        localStorage.setItem("userData", JSON.stringify(response.data.sendUser))
        setUser(response.data.sendUser)
      }
    } catch (error) {
      setShowToast(true);
      settoastmsg(error.response.data)
      console.log(error)
    }
  }


  return (
    <form onSubmit={handleRegister}>

<ToastContainer position="middle-center" className="p-3">
        <Toast className='register-toast' show={showToast} onClose={() => setShowToast(false)} delay={4000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Alert</strong>
          </Toast.Header>
          <Toast.Body>{toastmsg}</Toast.Body>
        </Toast>
      </ToastContainer>


 <div className='register'>
      <input onChange={(e)=>setname(e.target.value)} value={name} className='register__input' type='text' placeholder='Enter your name'></input>
        <input onChange={(e)=>setemail(e.target.value)} value={email} className='register__input' type='text' placeholder='Enter your email'></input>
      <input onChange={(e)=>setpassword(e.target.value)} value={password} className='register__input' type='password' placeholder='Enter password'></input>
      <input onChange={(e)=>setcpassword(e.target.value)} value={cpassword} className='register__input' type='password' placeholder='Confirm password'></input>
      <button type='submit' className='register__button'>Register</button>
    </div>
    </form>
   
  )
}

export default Register