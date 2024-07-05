import './App.scss';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/fixed/Navbar';
import Home from './components/pages/Home';
import Auth from "./components/authentication/auth"
import Cart from "./components/pages/Cart"
import Admin from './admin/page/Admin';
import UserList from './admin/outlet/UserList';
import AddProduct from "./admin/outlet/AddProduct"
import ProductList from './admin/outlet/ProductList';
import Orders from './components/pages/Orders';



function App() {
  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Auth />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders/>} />

          <Route path='admin' element={ <Admin/>} >
          <Route path='' element={<UserList/>}/>
          <Route path='productList/:product' element={<ProductList/>}/>
          <Route path='addProduct/:product' element={<AddProduct/>}/>
          </Route>

          
        </Routes>
    
      </Router>
   
    </>
  );
}

export default App;
