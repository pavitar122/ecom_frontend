import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../globalState/globalState';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastmsg, settoastmsg] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecom-backend-ten-gamma.vercel.app/user/login', {
        email,
        password,
      });

      if (response) {
        console.log(response);
        if (response.data.name === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
        localStorage.setItem('userData', JSON.stringify(response.data));
        setUser(response.data);
      }
    } catch (error) {
      setShowToast(true);
      settoastmsg(error.response.data)
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>


      <ToastContainer position="middle-center" className="p-3">
        <Toast className='register-toast' show={showToast} onClose={() => setShowToast(false)} delay={4000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Alert</strong>
          </Toast.Header>
          <Toast.Body>{toastmsg}</Toast.Body>
        </Toast>
      </ToastContainer>


      <div className='login'>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className='login__input'
          type='text'
          placeholder='Enter your email'
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className='login__input'
          type='password'
          placeholder='Enter your password'
        />
        <button type='submit' className='login__button'>Login</button>
      </div>
    </form>
  );
};

export default Login;
