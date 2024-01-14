import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { NavLink ,useNavigate} from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContexReducer';

 function Navbar() {
  const[cartView,setCartView]= useState(false);
  const navigate=useNavigate();
  const data=useCart();
  
  // To handle Logout Functionality
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate('/login')
  }
  const handleOnClickMyCart=()=>{
        navigate("/mycart")
  }
  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark bg-success">
    <div className="container-fluid">
      <NavLink className="navbar-brand fs-1 fst-italic" to="/">Go Food</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-1">
          <li className="nav-item">
            <NavLink className="nav-link active fs-5" aria-current="page" to="/">Home</NavLink>
          </li>
          {localStorage.getItem("authToken")? 
          <li className="nav-item">
          <NavLink className="nav-link active fs-5" aria-current="page" to="/myorders">My Orders</NavLink>
        </li>
          :""}
         
        </ul>
        {localStorage.getItem("authToken")?
         <div>
          <div className='btn text-success bg-white mx-2'
          onClick={()=>setCartView(true)}
          >My Cart{" "}
          {data.length>0? 
          
          <Badge pill bg='danger'>{data.length}</Badge>:''}
         </div>
          {
            cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null
          }
        <div className='btn text-success bg-white mx-2'
        onClick={handleLogout}
        >LogOut</div>
        </div>
        :<div className='d-flex'> 
            <NavLink className="btn bg-white text-success fs-5 mx-l font-weight-bold" to="/login">Login</NavLink>
        
        
            <NavLink className="btn bg-white text-success fs-5 mx-1 font-weight-bold" to="/signup">Sign Up</NavLink>
            </div>}
          
      </div>
    </div>
  </nav></div>
  )
}
export default Navbar;