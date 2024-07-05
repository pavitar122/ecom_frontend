import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Admin = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"))

    const addProduct = (Name)=>{
        navigate(`addProduct/${Name}`)
        window.location.reload();
    }

    if( userData && userData.name === "admin"){
        return (
            <div className='admin-page'>
                <div className='left'>
                    <div className='left__heading'>MODELS</div>
    
                    <div className='model'>
                        <div className='model__name' onClick={()=>navigate("/admin")} >Users</div>
                        <div className='model__icons'>
                        </div>
                    </div>
    
                    <div className='model'>
                        <div className='model__name' onClick={()=>navigate("/admin/productList/Headphone")} >Headphones</div>
                        <div className='model__icons'>
                            <span onClick={()=>addProduct("Headphone")}>ADD<i className="bi bi-plus"></i></span>
                        </div>
                    </div>
    
                    <div className='model'>
                        <div className='model__name' onClick={()=>navigate("/admin/productList/Earphone")} >Earphones</div>
                        <div className='model__icons'>
                            <span onClick={()=>addProduct("Earphone")}>ADD<i className="bi bi-plus"></i></span>
                        </div>
                    </div>
    
                    <div className='model'>
                        <div className='model__name' onClick={()=>navigate("/admin/productList/Speaker")} >Speakers</div>
                        <div className='model__icons'>
                            <span onClick={()=>addProduct("Speaker")}>ADD<i className="bi bi-plus"></i></span>
                        </div>
                    </div>
    
    
                </div>
                <div className='right'>
                    <Outlet />
                </div>
            </div>
        )
    }else{
        return(
            <div className='not-admin'>Login as Admin</div>
        )
       
    }

   
}

export default Admin